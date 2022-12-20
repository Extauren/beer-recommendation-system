from mysql.connector import MySQLConnection

from src.Database.query import read_query


class BeerReviewInfos:
    """
    Class to retrieve reviews about a beer by name
    """
    name: str
    average_appearance: float = 0  # /5
    average_aroma: float = 0  # /10
    average_palate: float = 0  # /5
    average_taste: float = 0  # /10
    average_overall: float = 0  # /20
    total_reviews: int = 0

    def __init__(self, connection: MySQLConnection, name: str, rate: str):
        self.name = name
        query_result: list[tuple] = read_query(connection, f'''
            SELECT * FROM Review WHERE beer_name LIKE "%{name}%"
        ''')
        # AND overall >= "%{int(rate)}%"
        self.total_reviews = len(query_result)
        if self.total_reviews == 0:
            # print(sum(map(lambda x: x[6], query_result)))
            # print(query_result)
            return
        self.average_appearance = sum(map(lambda x: x[2], query_result)) / self.total_reviews
        self.average_aroma = sum(map(lambda x: x[3], query_result)) / self.total_reviews
        self.average_palate = sum(map(lambda x: x[4], query_result)) / self.total_reviews
        self.average_taste = sum(map(lambda x: x[5], query_result)) / self.total_reviews
        self.average_overall = sum(map(lambda x: x[6], query_result)) / self.total_reviews
