// Dashboard home page
import { useEffect, useState } from 'react';
import EngagementChart from '../components/Charts/EngagementChart';
import KeywordChart from '../components/Charts/KeywordChart';
import LanguageChart from '../components/Charts/LanguageChart';
import TimelineChart from '../components/Charts/TimelineChart';
import TweetCard from '../components/Dashboard/TweetCard';
import { mockStats, mockTweets } from '../data/mockData';
import './DashboardPage.css';

const DashboardPage = () => {
    const [overview, setOverview] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [recentTweets, setRecentTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Using mock data for demonstration
            setTimeout(() => {
                setOverview({
                    total_tweets: mockStats.overview.totalTweets,
                    tweets_today: mockStats.overview.tweetsToday,
                    total_engagement: mockStats.engagement.totalLikes + mockStats.engagement.totalRetweets,
                    active_users: 342
                });
                setTimeline(mockStats.timeline);
                setRecentTweets(mockTweets.slice(0, 5));
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    const stats = [
        {
            title: 'Total Tweets',
            value: overview?.total_tweets || 0,
            icon: 'fa-comments',
            color: '#2563eb',
            change: '+12%'
        },
        {
            title: 'Today\'s Tweets',
            value: overview?.tweets_today || 0,
            icon: 'fa-chart-line',
            color: '#059669',
            change: '+8%'
        },
        {
            title: 'Total Engagement',
            value: overview?.total_engagement || 0,
            icon: 'fa-heart',
            color: '#dc2626',
            change: '+15%'
        },
        {
            title: 'Active Users',
            value: overview?.active_users || 0,
            icon: 'fa-users',
            color: '#d97706',
            change: '+5%'
        }
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p>Monitor curriculum discussions in real-time</p>
                </div>
                <button className="refresh-button" onClick={fetchDashboardData}>
                    <i className="fas fa-sync-alt"></i>
                    Refresh Data
                </button>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
                        <div className="stat-icon">
                            <i className={`fas ${stat.icon}`}></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-title">{stat.title}</p>
                            <h3 className="stat-value">{stat.value.toLocaleString()}</h3>
                            <span className="stat-change">{stat.change} from last week</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-grid">
                <div className="chart-card large">
                    <div className="chart-header">
                        <h3>Tweet Timeline</h3>
                        <p>Last 7 days</p>
                    </div>
                    <TimelineChart data={timeline} />
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Engagement Metrics</h3>
                        <p>Average per tweet</p>
                    </div>
                    <EngagementChart />
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Top Keywords</h3>
                        <p>Most mentioned</p>
                    </div>
                    <KeywordChart />
                </div>

                <div className="chart-card">
                    <div className="chart-header">
                        <h3>Language Distribution</h3>
                        <p>Tweet languages</p>
                    </div>
                    <LanguageChart />
                </div>
            </div>

            <div className="recent-tweets-section">
                <div className="section-header">
                    <h3>Recent Tweets</h3>
                    <a href="/tweets" className="view-all-link">View All →</a>
                </div>
                <div className="tweets-list">
                    {recentTweets.length > 0 ? (
                        recentTweets.map((tweet) => (
                            <TweetCard key={tweet._id || tweet.tweet_id} tweet={tweet} />
                        ))
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-comments" style={{ fontSize: '48px' }}></i>
                            <p>No tweets yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
