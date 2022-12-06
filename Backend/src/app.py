from flask import Flask
from flask_cors import CORS
import socket

from src.Routes.recommendation.survey.POST.route import bp as recommendation
from src.Routes.recommendation.user_evaluation.POST.route import bp as evualuation

def create_app() -> Flask:
    app = Flask(__name__)
    
    #socket.setdefaulttimeout(200)
    app.register_blueprint(recommendation)
    app.register_blueprint(evualuation)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    app.run(port=3001, debug=True)