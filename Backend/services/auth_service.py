from functools import wraps
from flask import session, redirect, url_for, flash
from werkzeug.security import check_password_hash, generate_password_hash

class AuthService:
    @staticmethod
    def login(username: str, password: str, config) -> bool:
        """Validate admin credentials"""
        if username == config['ADMIN_USERNAME'] and password == config['ADMIN_PASSWORD']:
            session['admin_logged_in'] = True
            session.permanent = True
            return True
        return False
    
    @staticmethod
    def logout():
        """Clear admin session"""
        session.pop('admin_logged_in', None)
    
    @staticmethod
    def is_authenticated() -> bool:
        """Check if admin is logged in"""
        return session.get('admin_logged_in', False)

def admin_required(f):
    """Decorator to protect admin routes"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not AuthService.is_authenticated():
            flash('Please login to access admin panel', 'error')
            return redirect(url_for('admin.login'))
        return f(*args, **kwargs)
    return decorated_function
