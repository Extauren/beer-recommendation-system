import os
from flask import Flask
from flask_cors import CORS
import socket

from src.Routes.recommendation.POST.route import bp as recommendation
from src.Routes.recommendation.user_evaluation.POST.route import \
    bp as evaluation
from src.Routes.recommendation.beer_note.POST.route import bp as beer_note


def create_app() -> Flask:
    app = Flask(__name__)

    # socket.setdefaulttimeout(200)
    app.register_blueprint(recommendation)
    app.register_blueprint(evaluation)
    app.register_blueprint(beer_note)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}},
         supports_credentials=True)

    return app


if __name__ == '__main__':
    app = create_app()
    debug: bool = bool(os.getenv("DEBUG", False) == "True")
    app.run(port=3001, debug=debug)
