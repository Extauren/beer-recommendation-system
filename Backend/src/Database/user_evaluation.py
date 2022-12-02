from typing import Optional

from mysql.connector import MySQLConnection

from src.Database.query import execute_query, read_query
from src.Scripts.init_database import connect_to_database


def add_evaluation_to_beer(connection: MySQLConnection, beer_id: int, value: int) -> None:
    execute_query(connection, f'''
        UPDATE User_evaluation
        SET note=note + {value}
        WHERE beer_id = {beer_id};
    ''')


def increase_beer_evaluation(connection: MySQLConnection, beer_id: int) -> None:
    add_evaluation_to_beer(connection, beer_id, 1)


def decrease_beer_evaluation(connection: MySQLConnection, beer_id: int) -> None:
    add_evaluation_to_beer(connection, beer_id, -1)


def get_user_evaluation(connection: MySQLConnection, beer_id: int) -> int:
    result: Optional[list[tuple]] = read_query(connection, f'''
        SELECT note FROM User_evaluation WHERE beer_id = {beer_id};
    ''')
    if not result:
        raise ValueError(f'beer id: {beer_id}, Not found')
    return result[0][0]


if __name__ == "__main__":
    connection: MySQLConnection = connect_to_database()
    increase_beer_evaluation(connection, 1)
