import os
from src.Database.user_evaluation import decrease_beer_evaluation, increase_beer_evaluation
import openai

from flask import request, Blueprint
from src.Scripts.init_database import connect_to_database

bp = Blueprint('user_evulation', __name__, url_prefix='/recommendation')

openai.api_key = os.getenv("OPENAI_API_KEY")

@bp.route("/user_evaluation", methods=(['POST']))
def add_evaluation_to_beer():
    user_eval = request.get_json(force=True)

    sentiment = recommendation_user_evaluation_post(user_eval["user_evaluation"]) # Maybe we'll change the request field, we should ask the frontend team
    connection = connect_to_database()
    if sentiment == "Positive":
        increase_beer_evaluation(connection, user_eval["beer_id"])
    elif sentiment == "Negative":
        decrease_beer_evaluation(connection, user_eval["beer_id"])
    else: # neutral
        pass
    return "OK", 201

def recommendation_user_evaluation_post(user_eval: str):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="Decide whether a Tweet's sentiment is positive, neutral, or negative.\n\nTweet: \"{}\"\nSentiment:".format(user_eval),
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.0
    )
    return response["choices"][0]["text"][1:]