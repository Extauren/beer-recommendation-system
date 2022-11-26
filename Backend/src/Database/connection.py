import sys
from typing import Optional

import mysql.connector
from mysql.connector import Error, MySQLConnection


def create_server_connection(host_name: str, port: int, user_name: str, user_password: str) -> Optional[
    MySQLConnection]:
    connection: Optional[MySQLConnection] = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            port=port,
            user=user_name,
            passwd=user_password
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)
    return connection


def create_db_connection(host_name: str, port: int, user_name: str, user_password: str, db_name: str) -> Optional[
    MySQLConnection]:
    connection: Optional[MySQLConnection] = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            port=port,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f'Error: {err}', file=sys.stderr)
    return connection
