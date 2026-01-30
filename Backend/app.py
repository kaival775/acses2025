from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from config import Config
from routes.api import api_bp
from routes.admin import admin_bp
from models.member import Member
from models.event import Event
from services.image_validator import ImageValidator
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS for frontend
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://localhost:3000",
                "http://127.0.0.1:5173",
                "https://acses2k25.vercel.app"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"],
            "supports_credentials": True
        }
    })
    
    # MongoDB connection with error handling
    try:
        mongo_uri = app.config['MONGO_URI']
        client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Test connection
        client.server_info()
        db = client.get_default_database()
        
        # Initialize models
        app.member_model = Member(db)
        app.event_model = Event(db)
        
        # Initialize services
        app.image_validator = ImageValidator(app.config)
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        # Continue without DB for health check
    
    # Register blueprints
    app.register_blueprint(api_bp)
    app.register_blueprint(admin_bp)
    
    @app.route('/')
    def index():
        return {"message": "ACSES Backend API", "status": "running", "version": "1.0"}
    
    @app.route('/health')
    def health():
        return {"status": "ok"}
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
