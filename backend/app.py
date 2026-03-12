# Main Flask application
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    
    # Initialize extensions
    CORS(app)
    jwt = JWTManager(app)
    
    # Test database connection on startup
    try:
        from utils.db_connection import get_db
        db = get_db()
        print("✅ Database connection established")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
    
    return app

app = create_app()

@app.route('/')
def health_check():
    """Health check endpoint"""
    try:
        from utils.db_connection import get_db
        db = get_db()
        
        # Test database connection
        db.command("ping")
        
        return jsonify({
            'status': 'Twitter Graph Backend Running',
            'version': '1.0',
            'database': 'Connected',
            'message': 'System is healthy'
        })
    except Exception as e:
        return jsonify({
            'status': 'Twitter Graph Backend Running',
            'version': '1.0',
            'database': 'Disconnected',
            'error': str(e),
            'message': 'Database connection issue'
        }), 500

@app.route('/api/test-db')
def test_database():
    """Test database operations"""
    try:
        from utils.db_connection import get_db
        from datetime import datetime
        
        db = get_db()
        
        # Test collection operations
        test_collection = db.api_test
        
        # Insert test document
        test_doc = {
            'test': 'api_endpoint',
            'message': 'Database test from API endpoint',
            'timestamp': datetime.utcnow(),
            'endpoint': '/api/test-db'
        }
        
        result = test_collection.insert_one(test_doc)
        
        # Retrieve the document
        retrieved = test_collection.find_one({'_id': result.inserted_id})
        
        # Clean up
        test_collection.delete_one({'_id': result.inserted_id})
        
        return jsonify({
            'success': True,
            'message': 'Database test successful',
            'inserted_id': str(result.inserted_id),
            'retrieved_message': retrieved['message'],
            'database': db.name
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Database test failed',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("🚀 Starting Twitter Graph Backend...")
    print("📍 Health check: http://localhost:5000")
    print("🧪 Database test: http://localhost:5000/api/test-db")
    app.run(debug=True, host='0.0.0.0', port=5000)