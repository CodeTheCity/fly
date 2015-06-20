import app
import json
test_app = app.app.test_client()

import unittest

class ApiTest(unittest.TestCase):
    def test_get_recent_finds(self):
        data = test_app.get('/api/finds/recent/')
        print data        
        parsed = json.loads(data.data)
        self.assertIsNotNone(parsed)



