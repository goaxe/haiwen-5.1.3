from django.core import mail
from django.core.management import call_command

from seahub.notifications.models import UserNotification, repo_share_msg_to_json
from seahub.profile.models import Profile
from seahub.test_utils import BaseTestCase


class CommandTest(BaseTestCase):

    def test_can_send(self):
        self.assertEqual(len(mail.outbox), 0)
        UserNotification.objects.add_repo_share_msg(
            self.user.username, repo_share_msg_to_json('bar@bar.com', self.repo.id))
        Profile.objects.add_or_update(self.user.username, 'nickname')

        call_command('send_notices')
        self.assertEqual(len(mail.outbox), 1)
        assert mail.outbox[0].to[0] == self.user.username

    def test_can_send_to_contact_email(self):
        self.assertEqual(len(mail.outbox), 0)
        UserNotification.objects.add_repo_share_msg(
            self.user.username, repo_share_msg_to_json('bar@bar.com', self.repo.id))
        p = Profile.objects.add_or_update(self.user.username, 'nickname')
        p.contact_email = 'contact@foo.com'
        p.save()

        call_command('send_notices')
        self.assertEqual(len(mail.outbox), 1)
        assert mail.outbox[0].to[0] == 'contact@foo.com'
