# encoding: utf-8
import datetime
import logging
import json
import os
import re

from django.utils.http import urlquote
from django.core.management.base import BaseCommand
from django.core.urlresolvers import reverse
from django.utils.html import escape
from django.utils import translation
from django.utils.translation import ugettext as _

import seaserv
from seaserv import seafile_api, ccnet_api
from seahub.base.models import CommandsLastCheck
from seahub.notifications.models import UserNotification
from seahub.utils import send_html_email, get_service_url, \
    get_site_scheme_and_netloc
import seahub.settings as settings
from seahub.avatar.templatetags.avatar_tags import avatar
from seahub.avatar.util import get_default_avatar_url
from seahub.base.templatetags.seahub_tags import email2nickname
from seahub.profile.models import Profile

# Get an instance of a logger
logger = logging.getLogger(__name__)

subject = _('New notice on %s') % settings.SITE_NAME

class Command(BaseCommand):
    help = 'Send Email notifications to user if he/she has an unread notices every period of seconds .'
    label = "notifications_send_notices"

    def handle(self, *args, **options):
        logger.debug('Start sending user notices...')
        self.do_action()
        logger.debug('Finish sending user notices.\n')

    def get_avatar(self, username, default_size=32):
        img_tag = avatar(username, default_size)
        pattern = r'src="(.*)"'
        repl = r'src="%s\1"' % get_site_scheme_and_netloc()
        return re.sub(pattern, repl, img_tag)

    def get_avatar_src(self, username, default_size=32):
        avatar_img = self.get_avatar(username, default_size)
        m = re.search('<img src="(.*?)".*', avatar_img)
        if m:
            return m.group(1)
        else:
            return ''

    def get_default_avatar(self, default_size=32):
        # user default avatar
        img_tag = """<img src="%s" width="%s" height="%s" class="avatar" alt="" />""" % \
                (get_default_avatar_url(), default_size, default_size)
        pattern = r'src="(.*)"'
        repl = r'src="%s\1"' % get_site_scheme_and_netloc()
        return re.sub(pattern, repl, img_tag)

    def get_default_avatar_src(self, default_size=32):
        avatar_img = self.get_default_avatar(default_size)
        m = re.search('<img src="(.*?)".*', avatar_img)
        if m:
            return m.group(1)
        else:
            return ''

    def format_user_message(self, notice):
        d = notice.user_message_detail_to_dict()
        msg_from = d['msg_from']
        message = d.get('message')

        notice.notice_from = escape(email2nickname(msg_from))
        notice.avatar_src = self.get_avatar_src(msg_from)
        notice.user_msg_url = reverse('user_msg_list', args=[msg_from])
        notice.user_msg = message
        return notice

    def format_group_message(self, notice):
        d = notice.group_message_detail_to_dict()
        group_id = d['group_id']
        message = d['message']
        group = ccnet_api.get_group(int(group_id))

        notice.group_url = reverse('group_discuss', args=[group.id])
        notice.notice_from = escape(email2nickname(d['msg_from']))
        notice.group_name = group.group_name
        notice.avatar_src = self.get_avatar_src(d['msg_from'])
        notice.grp_msg = message
        return notice

    def format_repo_share_msg(self, notice):
        d = json.loads(notice.detail)
        repo_id = d['repo_id']
        repo = seafile_api.get_repo(repo_id)

        notice.repo_url = reverse("view_common_lib_dir", args=[repo_id, ''])
        notice.notice_from = escape(email2nickname(d['share_from']))
        notice.repo_name = repo.name
        notice.avatar_src = self.get_avatar_src(d['share_from'])

        return notice

    def format_repo_share_to_group_msg(self, notice):
        d = json.loads(notice.detail)

        repo_id = d['repo_id']
        repo = seafile_api.get_repo(repo_id)
        group_id = d['group_id']
        group = ccnet_api.get_group(group_id)

        notice.repo_url = reverse("view_common_lib_dir", args=[repo_id, ''])
        notice.notice_from = escape(email2nickname(d['share_from']))
        notice.repo_name = repo.name
        notice.avatar_src = self.get_avatar_src(d['share_from'])
        notice.group_url = reverse("group_info", args=[group.id])
        notice.group_name = group.group_name

        return notice

    def format_file_uploaded_msg(self, notice):
        d = json.loads(notice.detail)

        file_name = d['file_name']
        repo_id = d['repo_id']
        uploaded_to = d['uploaded_to'].rstrip('/')
        file_path = uploaded_to + '/' + file_name
        file_link = reverse('view_lib_file', args=[repo_id, file_path])
        folder_link = reverse('view_common_lib_dir', args=[repo_id, uploaded_to.strip('/')])
        folder_name = os.path.basename(uploaded_to)

        notice.file_link = file_link
        notice.file_name = file_name
        notice.folder_link = folder_link
        notice.folder_name = folder_name
        notice.avatar_src = self.get_default_avatar_src()
        return notice

    def format_group_join_request(self, notice):
        d = json.loads(notice.detail)
        username = d['username']
        group_id = d['group_id']
        join_request_msg = d['join_request_msg']

        group = ccnet_api.get_group(group_id)

        notice.grpjoin_user_profile_url = reverse('user_profile',
                                                  args=[username])
        notice.grpjoin_group_url = reverse('group_members', args=[group_id])
        notice.notice_from = username
        notice.grpjoin_group_name = group.group_name
        notice.grpjoin_request_msg = join_request_msg
        notice.avatar_src = self.get_avatar_src(username)
        return notice

    def format_add_user_to_group(self, notice):
        d = json.loads(notice.detail)
        group_staff = d['group_staff']
        group_id = d['group_id']

        group = ccnet_api.get_group(group_id)

        notice.notice_from = group_staff
        notice.avatar_src = self.get_avatar_src(group_staff)
        notice.group_staff_profile_url = reverse('user_profile',
                                                  args=[group_staff])
        notice.group_url = reverse('group_info', args=[group_id])
        notice.group_name = group.group_name
        return notice

    def get_user_language(self, username):
        return Profile.objects.get_user_language(username)

    def do_action(self):
        now = datetime.datetime.now()

        try:
            cmd_last_check = CommandsLastCheck.objects.get(command_type=self.label)
            logger.debug('Last check time is %s' % cmd_last_check.last_check)

            unseen_notices = UserNotification.objects.get_all_notifications(
                seen=False, time_since=cmd_last_check.last_check)

            logger.debug('Update last check time to %s' % now)
            cmd_last_check.last_check = now
            cmd_last_check.save()
        except CommandsLastCheck.DoesNotExist:
            logger.debug('No last check time found, get all unread notices.')
            unseen_notices = UserNotification.objects.get_all_notifications(
                seen=False)

            logger.debug('Create new last check time: %s' % now)
            CommandsLastCheck(command_type=self.label, last_check=now).save()

        email_ctx = {}
        for notice in unseen_notices:
            if notice.to_user in email_ctx:
                email_ctx[notice.to_user] += 1
            else:
                email_ctx[notice.to_user] = 1

        for to_user, count in email_ctx.items():
            # save current language
            cur_language = translation.get_language()

            # get and active user language
            user_language = self.get_user_language(to_user)
            translation.activate(user_language)
            logger.debug('Set language code to %s for user: %s' % (user_language, to_user))
            self.stdout.write('[%s] Set language code to %s' % (
                str(datetime.datetime.now()), user_language))

            notices = []
            for notice in unseen_notices:
                logger.info('Processing unseen notice: [%s]' % (notice))

                d = json.loads(notice.detail)

                repo_id = d.get('repo_id', None)
                group_id = d.get('group_id', None)
                try:
                    if repo_id and not seafile_api.get_repo(repo_id):
                        notice.delete()
                        continue

                    if group_id and not ccnet_api.get_group(group_id):
                        notice.delete()
                        continue
                except Exception as e:
                    logger.error(e)
                    continue

                if notice.to_user != to_user:
                    continue

                elif notice.is_user_message():
                    notice = self.format_user_message(notice)

                elif notice.is_group_msg():
                    notice = self.format_group_message(notice)

                elif notice.is_repo_share_msg():
                    notice = self.format_repo_share_msg(notice)

                elif notice.is_repo_share_to_group_msg():
                    notice = self.format_repo_share_to_group_msg(notice)

                elif notice.is_file_uploaded_msg():
                    notice = self.format_file_uploaded_msg(notice)

                elif notice.is_group_join_request():
                    notice = self.format_group_join_request(notice)

                elif notice.is_add_user_to_group():
                    notice = self.format_add_user_to_group(notice)

                notices.append(notice)

            if not notices:
                continue

            contact_email = Profile.objects.get_contact_email_by_user(to_user)
            to_user = contact_email  # use contact email if any
            c = {
                'to_user': to_user,
                'notice_count': count,
                'notices': notices,
                }

            try:
                send_html_email(_('New notice on %s') % settings.SITE_NAME,
                                'notifications/notice_email.html', c,
                                None, [to_user])

                logger.info('Successfully sent email to %s' % to_user)
                self.stdout.write('[%s] Successfully sent email to %s' % (str(datetime.datetime.now()), to_user))
            except Exception as e:
                logger.error('Failed to send email to %s, error detail: %s' % (to_user, e))
                self.stderr.write('[%s] Failed to send email to %s, error detail: %s' % (str(datetime.datetime.now()), to_user, e))

            # restore current language
            translation.activate(cur_language)
