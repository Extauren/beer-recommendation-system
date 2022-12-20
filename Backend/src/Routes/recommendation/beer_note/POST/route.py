from flask import request, Blueprint
from src.Scripts.init_database import connect_to_database
from src.Database.query import read_query

bp = Blueprint('beer_note', __name__, url_prefix='/recommendation')

@bp.route("/beer_note", methods=(['POST']))
def beer_note():
    beer_list_id = request.get_json(force=True)
    beer_note = {}

    beer_list_id = beer_list_id["beerID"]
    print(beer_list_id)
    connection = connect_to_database()
    for i in range(0, len(beer_list_id)):
        print(read_query(connection, "SELECT * FROM User_evaluation WHERE beer_id = {}".format(beer_list_id[i])))
        beer_note[i] = read_query(connection, "SELECT * FROM User_evaluation WHERE beer_id = {}".format(beer_list_id[i]))
    connection.close()

    return beer_note, 201