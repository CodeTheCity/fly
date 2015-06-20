from lib.db import Nature, Find, Quest, User

import unittest


class ModelTestCase(unittest.TestCase):

    def test_model(self):
        n = Nature()
        self.assertIsInstance(n, Nature)
        f = Find()
        self.assertIsInstance(f, Find)    
        q = Quest()
        self.assertIsInstance(q, Quest)
        u = User()
        self.assertIsInstance(u, User)

