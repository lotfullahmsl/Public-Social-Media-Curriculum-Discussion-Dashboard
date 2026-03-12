#!/usr/bin/env python3
"""
Backend Setup Script for Twitter Graph Analysis System
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"\n🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def setup_virtual_environment():
    """Setup Python virtual environment"""
    print("🚀 Setting up Twitter Graph Backend...")
    
    # Check Python version
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("❌ Python 3.8 or higher is required")
        return False
    
    print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro} detected")
    
    # Create virtual environment
    if not run_command("python -m venv venv", "Creating virtual environment"):
        return False
    
    # Determine activation script based on OS
    if platform.system() == "Windows":
        activate_script = "venv\\Scripts\\activate"
        pip_command = "venv\\Scripts\\pip"
    else:
        activate_script = "source venv/bin/activate"
        pip_command = "venv/bin/pip"
    
    # Upgrade pip
    if not run_command(f"{pip_command} install --upgrade pip", "Upgrading pip"):
        return False
    
    # Install requirements
    if not run_command(f"{pip_command} install -r requirements.txt", "Installing Python packages"):
        return False
    
    # Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        if os.path.exists('.env.example'):
            run_command("cp .env.example .env", "Creating .env file")
            print("📝 Please edit .env file with your MongoDB URI and settings")
        else:
            print("⚠️  .env.example not found")
    
    print("\n🎉 Backend setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Edit .env file with your MongoDB URI")
    print("2. Activate virtual environment:")
    if platform.system() == "Windows":
        print("   venv\\Scripts\\activate")
    else:
        print("   source venv/bin/activate")
    print("3. Run the application:")
    print("   python app.py")
    
    return True

if __name__ == "__main__":
    setup_virtual_environment()