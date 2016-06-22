from django.core.urlresolvers import reverse

from seahub.test_utils import BaseTestCase

class RepoBasicInfoTest(BaseTestCase):
    def setUp(self):
        self.login_as(self.user)

    def test_can_render(self):
        resp = self.client.get(reverse('file_revisions', args=[self.repo.id]) + '?p=' + self.file
        )

        self.assertEqual(200, resp.status_code)
        self.assertTemplateUsed(resp, 'file_revisions.html')
        assert len(resp.context['commits']) == 1
