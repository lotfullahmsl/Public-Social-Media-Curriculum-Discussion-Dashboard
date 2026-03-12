#!/usr/bin/env python3
"""
Install minimal requirements for MongoDB testing
"""

import subprocess
import sys

def install_minimal_requirements():
    """Install minimal packages for testing"""
    print("🔄 Installing minimal requirements for MongoDB testing...")
    
    packages = [
        "Flask==2.3.3",
        "Flask-CORS==4.0.0", 
        "pymongo==4.5.0",
        "dnspython==2.4.2",
        "python-dotenv==1.0.0"
    ]
    
    for package in packages:
        try:
            print(f"📦 Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"✅ {package} installed successfully")
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to install {package}: {e}")
            return False
    
    print("🎉 Minimal requirements installed successfully!")
    print("🧪 You can now run: python test_mongodb.py")
    return True

if __name__ == "__main__":
    install_minimal_requirements()