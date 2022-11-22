import sys
from typing import Optional

from mysql.connector import Error, CMySQLConnection, MySQLConnection
from mysql.connector.cursor_cext import CMySQLCursor


def execute_query(connection: CMySQLConnection | MySQLConnection, query: str) -> None:
    cursor: CMySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)


def read_query(connection: CMySQLConnection | MySQLConnection, query: str) -> Optional[list[tuple]]:
    cursor: CMySQLCursor = connection.cursor()
    try:
        cursor.execute(query)
        return cursor.fetchall()
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)
        return None
