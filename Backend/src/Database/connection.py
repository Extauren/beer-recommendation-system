import sys
from typing import Optional

import mysql.connector
from mysql.connector import Error, MySQLConnection


def create_server_connection(host_name: str, port: int, user_name: str, user_password: str) -> Optional[MySQLConnection]:
    """
    This function creates a connection to a MySQL database server.

    Args:
      host_name (str): The hostname of the server.
      port (int): The port number that the MySQL server is listening on.
      user_name (str): The username of the MySQL user that you want to connect to the database with.
      user_password (str): The password for the user_name

    Returns:
      A MySQLConnection object
    """
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


def create_db_connection(host_name: str, port: int, user_name: str, user_password: str, db_name: str) -> Optional[MySQLConnection]:
    """
    It creates a connection to a MySQL database

    Args:
      host_name (str): The host name of the MySQL server.
      port (int): The port number to connect to the database.
      user_name (str): The username of the MySQL database user.
      user_password (str): The password for the user_name
      db_name (str): The name of the database you want to connect to.

    Returns:
      A MySQLConnection object
    """
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
