import unittest

from requests import Response, post


class Survey(unittest.TestCase):
    def test_basic_beer(self):
        abvMin: float = 4.0
        abvMax: float = 6.0
        organic: int = 0
        type: str = "Lager"

        body: dict = {
            "abvMin": abvMin,
            "abvMax": abvMax,
            "organic": organic,
            "type": type
        }
        response: Response = post("http://localhost:3001/recommendation",
                                  json=body)
        self.assertEqual(200, response.status_code)
        beer_list: list[dict] = response.json()
        for beer in beer_list:
            self.assertLessEqual(beer["abv"], abvMax)
            self.assertGreaterEqual(beer["abv"], abvMin)
            self.assertIn(type, beer["type"])
            self.assertEqual(organic, beer["organic"])

    def test_unknown_beer(self):
        abvMin: float = 4.0
        abvMax: float = 6.0
        organic: int = 0
        type: str = "______UNKNOWN______BEER__________"

        body: dict = {
            "abvMin": abvMin,
            "abvMax": abvMax,
            "organic": organic,
            "type": type
        }
        response: Response = post("http://localhost:3001/recommendation",
                                  json=body)
        self.assertEqual(response.status_code, 200)
        beer_list: list[dict] = response.json()
        self.assertListEqual(beer_list, [])


if __name__ == '__main__':
    unittest.main()
