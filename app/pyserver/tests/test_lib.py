from lib.db import Nature

import unittest


class ModelTestCase(unittest.TestCase):
    def test_model(self):
        n = Nature()
        self.assertEqual(type(n),Nature)
    


