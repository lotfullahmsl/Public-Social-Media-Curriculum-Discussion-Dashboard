#!/usr/bin/env python3
"""
Simple MongoDB Connection Test
Only requires: pymongo, dnspython, python-dotenv
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_mongodb_connection():
    """Simple MongoDB connection test"""
    print("🚀 Simple MongoDB Connection Test")
    print("=" * 40)
    
    try:
        # Import pymongo
        from pymongo import MongoClient
        from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
        from datetime import datetime
        
        # Get connection details
        connection_string = os.getenv('MONGODB_URI')
        database_name = os.getenv('DATABASE_NAME', 'twitter_graph_db')
        
        print(f"🔗 Connection String: {connection_string[:50]}...")
        print(f"📊 Database Name: {database_name}")
        
        # Create client
        print("\n🔄 Connecting to MongoDB...")
        client = MongoClient(
            connection_string,
            serverSelectionTimeoutMS=10000  # 10 second timeout
        )
        
        # Test connection
        client.admin.command('ping')
        print("✅ Successfully connected to MongoDB!")
        
        # Get database
        db = client[database_name]
        print(f"📍 Connected to database: {db.name}")
        
        # Test basic operations
        print("\n🧪 Testing basic operations...")
        
        # Create test collection
        test_collection = db.connection_test
        
        # Insert test document
        test_doc = {
            'test': 'simple_connection',
            'message': 'MongoDB connection successful!',
            'timestamp': datetime.utcnow(),
            'status': 'working'
        }
        
        result = test_collection.insert_one(test_doc)
        print(f"✅ Inserted test document with ID: {result.inserted_id}")
        
        # Retrieve document
        retrieved = test_collection.find_one({'_id': result.inserted_id})
        if retrieved:
            print(f"✅ Retrieved document: {retrieved['message']}")
        
        # Count documents
        count = test_collection.count_documents({})
        print(f"📊 Total documents in test collection: {count}")
        
        # List collections
        collections = db.list_collection_names()
        print(f"📋 Available collections: {collections}")
        
        # Clean up
        test_collection.delete_one({'_id': result.inserted_id})
        print("🧹 Test document cleaned up")
        
        # Close connection
        client.close()
        print("🔌 Connection closed")
        
        print("\n🎉 MongoDB connection test PASSED!")
        print("✅ Your database is ready for the application")
        
        return True
        
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("💡 Run: python install_minimal.py")
        return False
        
    except ConnectionFailure as e:
        print(f"❌ Connection failed: {e}")
        print("💡 Check your MongoDB URI and network connection")
        return False
        
    except ServerSelectionTimeoutError as e:
        print(f"❌ Server timeout: {e}")
        print("💡 Check if your IP is whitelisted in MongoDB Atlas")
        return False
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = test_mongodb_connection()
    
    if success:
        print(f"\n🎯 Next steps:")
        print("1. Install full requirements: pip install -r requirements.txt")
        print("2. Run Flask app: python app.py")
        print("3. Test API: http://localhost:5000")
    else:
        print(f"\n🔧 Troubleshooting:")
        print("1. Install packages: python install_minimal.py")
        print("2. Check .env file has correct MongoDB URI")
        print("3. Verify MongoDB Atlas IP whitelist")
        print("4. Test network connection")