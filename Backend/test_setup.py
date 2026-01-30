"""
Quick test script to verify backend setup
Run: python test_setup.py
"""

import sys
from pymongo import MongoClient
from config import Config

def test_imports():
    """Test if all required packages are installed"""
    print("Testing imports...")
    try:
        import flask
        import pymongo
        from werkzeug.security import generate_password_hash
        print("✓ All packages imported successfully")
        return True
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False

def test_mongodb_connection():
    """Test MongoDB connection"""
    print("\nTesting MongoDB connection...")
    try:
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=5000)
        client.server_info()
        print(f"✓ Connected to MongoDB: {Config.MONGO_URI}")
        return True
    except Exception as e:
        print(f"✗ MongoDB connection failed: {e}")
        print("  Make sure MongoDB is running or update MONGO_URI in .env")
        return False

def test_image_validator():
    """Test image URL validation"""
    print("\nTesting image validator...")
    from services.image_validator import ImageValidator
    
    validator = ImageValidator(Config)
    
    # Valid URLs
    valid_tests = [
        ("https://accesspicturescloud.vercel.app/members/john.jpg", "members"),
        ("https://accesspicturescloud.vercel.app/events/tech-fest/img1.jpg", "events"),
        ("https://accesspicturescloud.vercel.app/codex/2024-01/web/winner.jpg", "codex"),
    ]
    
    for url, category in valid_tests:
        is_valid, msg = validator.validate_url(url, category)
        if is_valid:
            print(f"✓ Valid {category} URL accepted")
        else:
            print(f"✗ Valid {category} URL rejected: {msg}")
            return False
    
    # Invalid URLs
    invalid_tests = [
        ("http://accesspicturescloud.vercel.app/members/john.jpg", "members"),  # HTTP
        ("https://evil.com/members/john.jpg", "members"),  # Wrong domain
    ]
    
    for url, category in invalid_tests:
        is_valid, msg = validator.validate_url(url, category)
        if not is_valid:
            print(f"✓ Invalid URL correctly rejected")
        else:
            print(f"✗ Invalid URL incorrectly accepted")
            return False
    
    return True

def test_models():
    """Test model initialization"""
    print("\nTesting models...")
    try:
        from pymongo import MongoClient
        from models.member import Member
        from models.event import Event
        from models.codex import CodeX
        
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=5000)
        db = client.get_default_database()
        
        member_model = Member(db)
        event_model = Event(db)
        codex_model = CodeX(db)
        
        print("✓ All models initialized successfully")
        return True
    except Exception as e:
        print(f"✗ Model initialization failed: {e}")
        return False

def main():
    print("=" * 50)
    print("ACSES Backend Setup Test")
    print("=" * 50)
    
    results = []
    results.append(("Package Imports", test_imports()))
    results.append(("MongoDB Connection", test_mongodb_connection()))
    results.append(("Image Validator", test_image_validator()))
    results.append(("Model Initialization", test_models()))
    
    print("\n" + "=" * 50)
    print("Test Summary")
    print("=" * 50)
    
    for test_name, passed in results:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{test_name}: {status}")
    
    all_passed = all(result[1] for result in results)
    
    if all_passed:
        print("\n✓ All tests passed! Backend is ready.")
        print("\nNext steps:")
        print("1. Run: python app.py")
        print("2. Visit: http://localhost:5000/admin")
        print("3. Login with credentials from .env")
    else:
        print("\n✗ Some tests failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
