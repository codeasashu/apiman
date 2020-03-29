from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class HomeTests(APITestCase):
    def test_get_home(self):
        """
        Ensure home returns status as success
        """
        url = reverse('home')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = response.content.json
        self.assertEqual(content.status, 'success')
