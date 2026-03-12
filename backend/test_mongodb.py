#!/usr/bin/env python3
"""
MongoDB Connection Test Script
Tests the connection to your MongoDB Atlas database
"""

import sys
import os

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from utils.db_connection import test_connection, get_db
from datetime import datetime

def comprehensive_test():
    """Run comprehensive MongoDB tests"""
    print("🚀 Starting MongoDB Connection Test")
    print("=" * 50)
    
    try:
        # Test basic connection
        if not test_connection():
            print("❌ Basic connection test failed")
            return False
        
        print("\n🔍 Running comprehensive tests...")
        
        # Get database instance
        db = get_db()
        
        # Test creating collections for our application
        collections_to_test = [
            'tweets',
            'users', 
            'relationships',
            'communities',
            'graph_metrics'
        ]
        
        for collection_name in collections_to_test:
            print(f"\n📝 Testing collection: {collection_name}")
            
            collection = db[collection_name]
            
            # Insert test document
            test_doc = {
                'test_data': True,
                'collection': collection_name,
                'created_at': datetime.utcnow(),
                'message': f'Test document for {collection_name} collection'
            }
            
            result = collection.insert_one(test_doc)
            print(f"   ✅ Inserted test document: {result.inserted_id}")
            
            # Retrieve test document
            retrieved = collection.find_one({'_id': result.inserted_id})
            if retrieved:
                print(f"   ✅ Retrieved document: {retrieved['message']}")
            
            # Clean up
            collection.delete_one({'_id': result.inserted_id})
            print(f"   🧹 Cleaned up test document")
        
        # Test database statistics
        print(f"\n📊 Database Statistics:")
        stats = db.command("dbstats")
        print(f"   Database: {stats.get('db', 'N/A')}")
        print(f"   Collections: {stats.get('collections', 'N/A')}")
        print(f"   Data Size: {stats.get('dataSize', 0)} bytes")
        print(f"   Storage Size: {stats.get('storageSize', 0)} bytes")
        
        # Test indexes (create sample index)
        print(f"\n🔍 Testing index creation...")
        tweets_collection = db.tweets
        
        # Create index on tweet_id field
        index_result = tweets_collection.create_index("tweet_id", unique=True)
        print(f"   ✅ Created index: {index_result}")
        
        # List indexes
        indexes = list(tweets_collection.list_indexes())
        print(f"   📋 Available indexes: {[idx['name'] for idx in indexes]}")
        
        print("\n🎉 All MongoDB tests passed successfully!")
        print("✅ Your database is ready for the Twitter Graph application")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Comprehensive test failed: {e}")
        return False

def quick_test():
    """Quick connection test"""
    print("⚡ Quick MongoDB Connection Test")
    print("-" * 30)
    
    try:
        db = get_db()
        
        # Simple ping test
        result = db.command("ping")
        if result.get('ok') == 1:
            print("✅ MongoDB connection successful!")
            print(f"📍 Connected to database: {db.name}")
            return True
        else:
            print("❌ MongoDB ping failed")
            return False
            
    except Exception as e:
        print(f"❌ Quick test failed: {e}")
        return False

if __name__ == "__main__":
    print("🔧 MongoDB Test Options:")
    print("1. Quick test (default)")
    print("2. Comprehensive test")
    
    choice = input("\nEnter choice (1 or 2): ").strip()
    
    if choice == "2":
        success = comprehensive_test()
    else:
        success = quick_test()
    
    if success:
        print(f"\n🎯 Next steps:")
        print("1. Run: python app.py")
        print("2. Test API: http://localhost:5000")
        sys.exit(0)
    else:
        print(f"\n🔧 Troubleshooting:")
        print("1. Check your MongoDB URI in .env file")
        print("2. Ensure your IP is whitelisted in MongoDB Atlas")
        print("3. Verify your MongoDB credentials")
        sys.exit(1)