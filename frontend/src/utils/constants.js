// Application constants
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/',
    TWEETS: '/tweets',
    STATISTICS: '/statistics',
    KEYWORDS: '/keywords'
};

export const LANGUAGES = {
    en: 'English',
    ar: 'Arabic',
    ku: 'Kurdish'
};

export const SORT_OPTIONS = [
    { value: 'created_at', label: 'Most Recent' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'retweets', label: 'Most Retweeted' },
    { value: 'replies', label: 'Most Replied' }
];

export const CHART_COLORS = {
    primary: '#6366f1',
    secondary: '#ec4899',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    purple: '#a855f7',
    orange: '#f97316'
};

