# Social Media Dashboard - Frontend

React-based dashboard for monitoring university curriculum discussions on social media.

## Tech Stack
- React 18
- React Router v6
- Axios
- Recharts
- Vite

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs on http://localhost:3000

## Build

```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Sidebar, Footer
│   │   ├── Auth/            # Login, ProtectedRoute
│   │   ├── Dashboard/       # Overview, TweetFeed, TweetCard, FilterPanel
│   │   ├── Charts/          # Timeline, Engagement, Keyword, Language charts
│   │   └── Keywords/        # KeywordList, KeywordForm
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TweetsPage.jsx
│   │   ├── StatisticsPage.jsx
│   │   └── KeywordsPage.jsx
│   ├── services/
│   │   ├── api.js           # Axios configuration
│   │   ├── authService.js
│   │   ├── tweetService.js
│   │   ├── statsService.js
│   │   └── keywordService.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTweets.js
│   │   └── useStats.js
│   ├── utils/
│   │   ├── dateFormatter.js
│   │   └── constants.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
└── index.html
```

## Features

- User authentication
- Real-time tweet feed
- Interactive charts and statistics
- Keyword filtering
- Language filtering
- Date range filtering
- Responsive design
