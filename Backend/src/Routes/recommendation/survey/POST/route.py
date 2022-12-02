from __main__ import app
import json
import random
from src.RateBeer_API.BeerInfos import BeerReviewInfos

from flask import request

from src.Database.query import read_query
from src.Database.connection import create_db_connection


def get_type(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `type` LIKE '%{}%' AND `abv` >= '{}' AND `abv` <= '{}' AND `organic` = '{}'".format(survey["type"], survey["abvMin"], survey["abvMax"], survey["organic"]))
    # return read_query(connection, "SELECT * FROM Beer WHERE `type` = '{}'".format(survey["type"]))

def get_abv(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `abv` = '{}'".format(survey["abv"]))

def get_ibu(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `ibu` = '{}'".format(survey["ibu"]))

def get_organic(survey, connection):
    return read_query(connection, "SELECT * FROM Beer WHERE `organic` = '{}'".format(survey["organic"]))

@app.post("/recommendation")
def recommendation_post():
    recommended_beer_list = []
    survey = request.get_json(force=True)

    connection = create_db_connection("db", 3306, "user", "password", "beer_database")

    beer_list = get_type(survey, connection)
    # for i in range(len(beer_list)):
    #     if (beer_list[i][3] >= float(survey["abvMin"]) and beer_list[i][3] <= float(survey["abvMax"])) \
    #     and beer_list[i][9] == int(survey["organic"]):
    #         recommended_beer_list.append(beer_list[i])
    random_recommended_beer = random.sample(beer_list, 10)
    connection.close()
    return random_recommended_beer, 200
