// Statistics page
import { useEffect, useState } from 'react';
import EngagementChart from '../components/Charts/EngagementChart';
import KeywordChart from '../components/Charts/KeywordChart';
import LanguageChart from '../components/Charts/LanguageChart';
import TimelineChart from '../components/Charts/TimelineChart';
import { mockStats } from '../data/mockData';
import './StatisticsPage.css';

const StatisticsPage = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        // Using mock data for demonstration
        setTimeout(() => {
            setStats({
                overview: {
                    total_tweets: mockStats.overview.totalTweets,
                    total_engagement: mockStats.engagement.totalLikes + mockStats.engagement.totalRetweets,
                    avg_engagement: mockStats.overview.averageEngagement
                },
                timeline: mockStats.timeline
            });
            setLoading(false);
        }, 500);
    };

    const refresh = () => {
        fetchStats();
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading statistics...</p>
            </div>
        );
    }

    return (
        <div className="statistics-page">
            <div className="page-header">
                <div>
                    <h1>Statistics & Analytics</h1>
                    <p>Detailed insights and trends</p>
                </div>
                <button className="refresh-button" onClick={refresh}>
                    <i className="fas fa-sync-alt"></i>
                    Refresh
                </button>
            </div>

            <div className="stats-overview">
                <div className="stat-box">
                    <div className="stat-icon" style={{ background: '#2563eb' }}>
                        <i className="fas fa-chart-bar"></i>
                    </div>
                    <div>
                        <p className="stat-label">Total Tweets</p>
                        <h3 className="stat-number">{stats.overview?.total_tweets?.toLocaleString() || 0}</h3>
                    </div>
                </div>

                <div className="stat-box">
                    <div className="stat-icon" style={{ background: '#059669' }}>
                        <i className="fas fa-chart-line"></i>
                    </div>
                    <div>
                        <p className="stat-label">Total Engagement</p>
                        <h3 className="stat-number">{stats.overview?.total_engagement?.toLocaleString() || 0}</h3>
                    </div>
                </div>

                <div className="stat-box">
                    <div className="stat-icon" style={{ background: '#7c3aed' }}>
                        <i className="fas fa-heart"></i>
                    </div>
                    <div>
                        <p className="stat-label">Avg. Engagement</p>
                        <h3 className="stat-number">{stats.overview?.avg_engagement?.toFixed(1) || 0}</h3>
                    </div>
                </div>
            </div>

            <div className="charts-section">
                <div className="chart-container full-width">
                    <div className="chart-title">
                        <h3>Tweet Timeline</h3>
                        <p>Tweets over time</p>
                    </div>
                    <TimelineChart data={stats.timeline || []} />
                </div>

                <div className="chart-container">
                    <div className="chart-title">
                        <h3>Engagement Breakdown</h3>
                        <p>Average per tweet</p>
                    </div>
                    <EngagementChart />
                </div>

                <div className="chart-container">
                    <div className="chart-title">
                        <h3>Top Keywords</h3>
                        <p>Most mentioned topics</p>
                    </div>
                    <KeywordChart />
                </div>

                <div className="chart-container">
                    <div className="chart-title">
                        <h3>Language Distribution</h3>
                        <p>Tweet languages</p>
                    </div>
                    <LanguageChart />
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;
