# MongoDB connection
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DatabaseConnection:
    def __init__(self):
        self.client = None
        self.db = None
        self.connection_string = os.getenv('MONGODB_URI')
        self.database_name = os.getenv('DATABASE_NAME', 'twitter_graph_db')
    
    def connect(self):
        """Establish connection to MongoDB"""
        try:
            print(f"🔄 Connecting to MongoDB...")
            self.client = MongoClient(
                self.connection_string,
                serverSelectionTimeoutMS=5000  # 5 second timeout
            )
            
            # Test the connection
            self.client.admin.command('ping')
            self.db = self.client[self.database_name]
            
            print(f"✅ Successfully connected to MongoDB database: {self.database_name}")
            return True
            
        except ConnectionFailure as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            return False
        except ServerSelectionTimeoutError as e:
            print(f"❌ MongoDB server selection timeout: {e}")
            return False
        except Exception as e:
            print(f"❌ Unexpected error connecting to MongoDB: {e}")
            return False
    
    def get_database(self):
        """Get database instance"""
        if self.db is None:
            if not self.connect():
                raise Exception("Failed to connect to database")
        return self.db
    
    def close_connection(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            print("🔌 MongoDB connection closed")

# Global database instance
_db_connection = None

def get_db():
    """Get database instance (singleton pattern)"""
    global _db_connection
    if _db_connection is None:
        _db_connection = DatabaseConnection()
    
    return _db_connection.get_database()

def test_connection():
    """Test MongoDB connection"""
    try:
        db = get_db()
        
        # Test basic operations
        print("🧪 Testing database operations...")
        
        # Test collection creation and insertion
        test_collection = db.connection_test
        test_doc = {
            "test": "connection",
            "message": "MongoDB connection successful!",
            "timestamp": "2024-03-11"
        }
        
        result = test_collection.insert_one(test_doc)
        print(f"✅ Test document inserted with ID: {result.inserted_id}")
        
        # Test document retrieval
        retrieved_doc = test_collection.find_one({"test": "connection"})
        if retrieved_doc:
            print(f"✅ Test document retrieved: {retrieved_doc['message']}")
        
        # Test document count
        count = test_collection.count_documents({})
        print(f"✅ Total test documents: {count}")
        
        # Clean up test document
        test_collection.delete_one({"_id": result.inserted_id})
        print("🧹 Test document cleaned up")
        
        # List collections
        collections = db.list_collection_names()
        print(f"📋 Available collections: {collections}")
        
        return True
        
    except Exception as e:
        print(f"❌ Database test failed: {e}")
        return False

if __name__ == "__main__":
    test_connection()