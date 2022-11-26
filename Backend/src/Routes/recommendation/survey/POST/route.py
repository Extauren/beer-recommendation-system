from __main__ import app
import json

from flask import request

from src.Database.query import read_query
from src.Database.connection import create_db_connection


def get_type(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `type` = '{}' LIMIT 5".format(survey["type"])) ## delete limit later

def get_abv(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `abv` = '{}' LIMIT 5".format(survey["abv"])) ## delete limit later

def get_ibu(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `ibu` = '{}' LIMIT 5".format(survey["ibu"])) ## delete limit later

def one_param(survey, connection):
    if "type" in survey:
        db_list = get_type(survey, connection)
    elif "abv" in survey:
        db_list = get_abv(survey, connection)
    elif "ibu" in survey:
        db_list = get_ibu(survey, connection)
    elif db_list is None:
        return "Not found"
    else:
        return db_list

@app.post("/recommendation")
def recommendation_post():
    recommended_beer_list = []
    survey = request.get_json(force=True)

    connection = create_db_connection("db", "3306", "user", "password", "beer_database")

    if len(survey) == 1:
        return one_param(survey, connection)

    beer_list = get_type(survey, connection)
    for i in range(len(beer_list)):
        if (beer_list[i][3] >= float(survey["abvMin"]) and beer_list[i][3] <= float(survey["abvMax"])) \
        and (beer_list[i][4] >= float(survey["ibuMin"]) and beer_list[i][4] <= float(survey["ibuMax"])):
            recommended_beer_list.append(beer_list[i])

    connection.close()
    return recommended_beer_list, 200
