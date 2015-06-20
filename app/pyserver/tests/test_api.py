import app
import json
test_app = app.app.test_client()

import unittest


class ApiTest(unittest.TestCase):

    def test_get_recent_finds(self):
        data = test_app.get('/api/finds/recent/')
        parsed = json.loads(data.data)
        self.assertIsNotNone(parsed)
        self.assertIsNotNone(parsed[0]['_id'])

    def test_get_latest_quest(self):
        data = test_app.get('/api/quest/')
        parsed = json.loads(data.data)
        self.assertIsNotNone(parsed)
        self.assertIsNotNone(parsed['_id'])





