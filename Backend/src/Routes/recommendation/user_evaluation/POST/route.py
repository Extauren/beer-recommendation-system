from __main__ import app

import os
import openai

from flask import request

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.post("/recommendation/user_evaluation")
def recommendation_user_evaluation_post():
    user_eval = request.get_json(force=True)

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt="Decide whether a Tweet's sentiment is positive, neutral, or negative.\n\nTweet: \"{}\"\nSentiment:".format(user_eval["user_evaluation"]),
        temperature=0,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.0
    )
    return response, 201