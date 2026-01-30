import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-change-in-production')
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/acses_db')
    
    # Session config
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Image hosting config
    ALLOWED_IMAGE_DOMAIN = 'acsespicscloud.vercel.app'
    IMAGE_URL_PATTERNS = {
        'members': r'^https://acsespicscloud\.vercel\.app/members/.+\.(jpg|jpeg|png|webp)$',
        'events': r'^https://acsespicscloud\.vercel\.app/events/.+/.+\.(jpg|jpeg|png|webp)$',
        'codex': r'^https://acsespicscloud\.vercel\.app/codex/.+/.+\.(jpg|jpeg|png|webp)$'
    }
    
    # Admin credentials (use env vars in production)
    ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', 'changeme123')
