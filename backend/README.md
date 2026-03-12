# Twitter Graph Backend

Backend system for Kurdistan Region university social media monitoring.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Setup environment:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and settings
```

4. Run the application:
```bash
python app.py
```

## API Endpoints

- `GET /` - Health check
- `POST /api/auth/login` - Authentication
- `GET /api/tweets/` - Get tweets
- `GET /api/users/` - Get users
- `GET /api/graph/` - Get graph data
- `GET /api/communities/` - Get communities
- `GET /api/analytics/` - Get analytics

## Testing

```bash
python -m pytest tests/
```