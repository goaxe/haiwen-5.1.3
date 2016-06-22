from django.core.urlresolvers import reverse

from constance import config

from seahub.options.models import UserOptions
from seahub.test_utils import BaseTestCase

class LibrariesTest(BaseTestCase):
    def setUp(self):
        self.url = reverse('libraries')

    def test_user_guide(self):
        self.login_as(self.user)
        username = self.user.username
        assert UserOptions.objects.get_default_repo(username) is None
        assert UserOptions.objects.is_user_guide_enabled(username) is True

        resp = self.client.get(self.url)
        self.assertEqual(200, resp.status_code)
        self.assertTemplateUsed(resp, 'libraries.html')
        assert resp.context['guide_enabled'] is True

        resp = self.client.get(self.url)
        assert resp.context['guide_enabled'] is False

        assert UserOptions.objects.get_default_repo(username) is not None
        assert UserOptions.objects.is_user_guide_enabled(username) is False

    def test_pub_repo_creation_config(self):
        self.clear_cache()

        # user
        self.login_as(self.user)

        config.ENABLE_USER_CREATE_ORG_REPO = 1
        assert bool(config.ENABLE_USER_CREATE_ORG_REPO) is True

        resp = self.client.get(self.url)
        self.assertEqual(200, resp.status_code)
        assert resp.context['can_add_pub_repo'] is True

        config.ENABLE_USER_CREATE_ORG_REPO = 0
        assert bool(config.ENABLE_USER_CREATE_ORG_REPO) is False

        resp = self.client.get(self.url)
        self.assertEqual(200, resp.status_code)
        assert resp.context['can_add_pub_repo'] is False

        # logout
        self.logout()

        # admin
        self.login_as(self.admin)

        config.ENABLE_USER_CREATE_ORG_REPO = 1
        assert bool(config.ENABLE_USER_CREATE_ORG_REPO) is True

        resp = self.client.get(self.url)
        self.assertEqual(200, resp.status_code)
        assert resp.context['can_add_pub_repo'] is True

        config.ENABLE_USER_CREATE_ORG_REPO = 0
        assert bool(config.ENABLE_USER_CREATE_ORG_REPO) is False

        resp = self.client.get(self.url)
        self.assertEqual(200, resp.status_code)
        assert resp.context['can_add_pub_repo'] is True
