"""
Generate a secure SECRET_KEY for Flask application
Run: python generate_secret_key.py
"""

import secrets

def generate_secret_key(length=32):
    """Generate a cryptographically secure secret key"""
    return secrets.token_hex(length)

if __name__ == "__main__":
    print("=" * 60)
    print("Flask SECRET_KEY Generator")
    print("=" * 60)
    print("\nGenerated SECRET_KEY:")
    print(generate_secret_key())
    print("\nCopy this key to your .env file:")
    print("SECRET_KEY=<paste_key_here>")
    print("\n⚠ Keep this key secret and never commit to Git!")
    print("=" * 60)
