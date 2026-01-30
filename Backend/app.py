from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import Config
from routes.api import api_bp
from routes.admin import admin_bp
from models.member import Member
from models.event import Event
from services.image_validator import ImageValidator

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for frontend
    CORS(app, resources={
        r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}
    })
    
    # MongoDB connection
    client = MongoClient(app.config['MONGO_URI'])
    db = client.get_default_database()
    
    # Initialize models
    app.member_model = Member(db)
    app.event_model = Event(db)
    
    # Initialize services
    app.image_validator = ImageValidator(app.config)
    
    # Register blueprints
    app.register_blueprint(api_bp)
    app.register_blueprint(admin_bp)
    
    @app.route('/')
    def index():
        return {"message": "ACSES Backend API", "status": "running"}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
