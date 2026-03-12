import { useState } from 'react';
import InformationFlow from '../components/Analytics/InformationFlow';
import PlatformComparison from '../components/Analytics/PlatformComparison';
import TemporalAnalysis from '../components/Analytics/TemporalAnalysis';
import { useAnalytics } from '../hooks/useAnalytics';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
    const [activeTab, setActiveTab] = useState('platform');
    const { analyticsData, loading, error } = useAnalytics();

    const tabs = [
        { id: 'platform', label: 'Platform Comparison', icon: 'fa-chart-pie' },
        { id: 'temporal', label: 'Temporal Analysis', icon: 'fa-chart-line' },
        { id: 'flow', label: 'Information Flow', icon: 'fa-stream' },
        { id: 'trends', label: 'Trends & Patterns', icon: 'fa-trending-up' }
    ];

    if (loading) {
        return (
            <div className="analytics-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading advanced analytics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="analytics-page">
                <div className="error-container">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>Error loading analytics: {error}</p>
                </div>
            </div>
        );
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'platform':
                return <PlatformComparison data={analyticsData.platforms} />;
            case 'temporal':
                return <TemporalAnalysis data={analyticsData.temporal} />;
            case 'flow':
                return <InformationFlow data={analyticsData.flow} />;
            case 'trends':
                return (
                    <div className="trends-analysis">
                        <div className="trends-grid">
                            <div className="trend-card">
                                <h3>Top Trending Topics</h3>
                                <div className="trend-list">
                                    {analyticsData.trends?.topics?.map((topic, index) => (
                                        <div key={index} className="trend-item">
                                            <span className="trend-rank">#{index + 1}</span>
                                            <span className="trend-topic">{topic.name}</span>
                                            <span className="trend-count">{topic.count} posts</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="trend-card">
                                <h3>Viral Content Patterns</h3>
                                <div className="viral-patterns">
                                    <div className="pattern-metric">
                                        <label>Average Viral Threshold</label>
                                        <span>{analyticsData.trends?.viralThreshold || 150} interactions</span>
                                    </div>
                                    <div className="pattern-metric">
                                        <label>Peak Activity Hours</label>
                                        <span>{analyticsData.trends?.peakHours || '2-4 PM'}</span>
                                    </div>
                                    <div className="pattern-metric">
                                        <label>Most Active Platform</label>
                                        <span>{analyticsData.trends?.activePlatform || 'Twitter'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <PlatformComparison data={analyticsData.platforms} />;
        }
    };

    return (
        <div className="analytics-page">
            <div className="page-header">
                <h1>Advanced Analytics</h1>
                <p>Deep insights into cross-platform social media patterns and trends</p>
            </div>

            <div className="analytics-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <i className={`fas ${tab.icon}`}></i>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="analytics-content">
                {renderTabContent()}
            </div>

            <div className="analytics-summary">
                <div className="summary-stats">
                    <div className="stat-item">
                        <i className="fas fa-database"></i>
                        <div className="stat-content">
                            <span className="stat-value">{analyticsData.summary?.totalPosts?.toLocaleString() || '0'}</span>
                            <span className="stat-label">Total Posts Analyzed</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-users"></i>
                        <div className="stat-content">
                            <span className="stat-value">{analyticsData.summary?.totalUsers?.toLocaleString() || '0'}</span>
                            <span className="stat-label">Unique Users</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-share-alt"></i>
                        <div className="stat-content">
                            <span className="stat-value">{analyticsData.summary?.totalInteractions?.toLocaleString() || '0'}</span>
                            <span className="stat-label">Total Interactions</span>
                        </div>
                    </div>
                    <div className="stat-item">
                        <i className="fas fa-clock"></i>
                        <div className="stat-content">
                            <span className="stat-value">{analyticsData.summary?.lastUpdated || 'N/A'}</span>
                            <span className="stat-label">Last Updated</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;