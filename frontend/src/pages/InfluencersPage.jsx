import { useState } from 'react';
import InfluencerRanking from '../components/Analytics/InfluencerRanking';
import useInfluencers from '../hooks/useInfluencers';
import './InfluencersPage.css';

const InfluencersPage = () => {
    const {
        influencers,
        selectedInfluencer,
        influencerDetails,
        loading,
        error,
        filters,
        selectInfluencer,
        updateFilters,
        influencerStats,
        influencersByPlatform,
        influenceTrends
    } = useInfluencers();

    const [showDetails, setShowDetails] = useState(false);

    const handleInfluencerSelect = (userId) => {
        selectInfluencer(userId);
        setShowDetails(true);
    };

    const closeDetails = () => {
        setShowDetails(false);
        selectInfluencer(null);
    };

    const getInfluenceLevel = (score) => {
        if (score >= 0.8) return { level: 'Expert', color: '#ff6b6b' };
        if (score >= 0.6) return { level: 'Influencer', color: '#4ecdc4' };
        if (score >= 0.4) return { level: 'Active', color: '#45b7d1' };
        if (score >= 0.2) return { level: 'Emerging', color: '#96ceb4' };
        return { level: 'Beginner', color: '#feca57' };
    };

    const getPlatformIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'twitter': return '🐦';
            case 'instagram': return '📷';
            case 'facebook': return '👥';
            case 'telegram': return '✈️';
            default: return '📱';
        }
    };

    if (loading && !influencers.length) {
        return (
            <div className="influencers-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading influencers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="influencers-page">
                <div className="error-container">
                    <h3>Error Loading Influencers</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="influencers-page">
            <div className="influencers-header">
                <div className="header-left">
                    <h1>Influencer Analysis</h1>
                    <p>Discover and analyze the most influential users in the network</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-value">{influencerStats.totalInfluencers || 0}</span>
                        <span className="stat-label">Influencers</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{influencerStats.averageInfluenceScore || '0.000'}</span>
                        <span className="stat-label">Avg Score</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{Object.keys(influencerStats.platformDistribution || {}).length}</span>
                        <span className="stat-label">Platforms</span>
                    </div>
                </div>
            </div>

            <div className="influencers-content">
                <div className="main-content">
                    <InfluencerRanking
                        influencers={influencers}
                        onInfluencerSelect={handleInfluencerSelect}
                        influenceTrends={influenceTrends}
                    />
                </div>

                {/* Platform Overview */}
                <div className="platform-overview">
                    <h3>Influencers by Platform</h3>
                    <div className="platform-cards">
                        {Object.entries(influencersByPlatform).map(([platform, platformInfluencers]) => (
                            <div key={platform} className="platform-card">
                                <div className="platform-header">
                                    <span className="platform-icon">{getPlatformIcon(platform)}</span>
                                    <h4>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                                </div>

                                <div className="platform-stats">
                                    <div className="stat">
                                        <label>Influencers</label>
                                        <span>{platformInfluencers.length}</span>
                                    </div>
                                    <div className="stat">
                                        <label>Top Score</label>
                                        <span>
                                            {platformInfluencers.length > 0 ?
                                                (platformInfluencers[0].influence_score || 0).toFixed(3) : '0.000'}
                                        </span>
                                    </div>
                                </div>

                                <div className="top-influencers">
                                    <label>Top 3:</label>
                                    {platformInfluencers.slice(0, 3).map((inf, idx) => (
                                        <div key={inf.id || idx} className="mini-influencer">
                                            <span className="mini-rank">#{idx + 1}</span>
                                            <span className="mini-name">
                                                {inf.username || inf.display_name || `User ${inf.id}`}
                                            </span>
                                            <span className="mini-score">
                                                {(inf.influence_score || 0).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Influence Levels Distribution */}
                <div className="influence-levels">
                    <h3>Influence Level Distribution</h3>
                    <div className="levels-grid">
                        {['Expert', 'Influencer', 'Active', 'Emerging', 'Beginner'].map(level => {
                            const count = influencers.filter(inf => {
                                const userLevel = getInfluenceLevel(inf.influence_score || 0).level;
                                return userLevel === level;
                            }).length;

                            const percentage = influencers.length > 0 ?
                                ((count / influencers.length) * 100).toFixed(1) : '0.0';

                            const levelInfo = getInfluenceLevel(level === 'Expert' ? 0.9 :
                                level === 'Influencer' ? 0.7 :
                                    level === 'Active' ? 0.5 :
                                        level === 'Emerging' ? 0.3 : 0.1);

                            return (
                                <div key={level} className="level-card">
                                    <div className="level-header">
                                        <h4 style={{ color: levelInfo.color }}>{level}</h4>
                                        <span className="level-count">{count}</span>
                                    </div>
                                    <div className="level-bar">
                                        <div
                                            className="level-fill"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: levelInfo.color
                                            }}
                                        ></div>
                                    </div>
                                    <div className="level-percentage">{percentage}%</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Influencer Details Modal */}
            {showDetails && influencerDetails && (
                <div className="influencer-modal-overlay" onClick={closeDetails}>
                    <div className="influencer-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Influencer Details</h3>
                            <button className="close-btn" onClick={closeDetails}>×</button>
                        </div>

                        <div className="modal-content">
                            <div className="influencer-profile">
                                <div className="profile-header">
                                    <h4>{influencerDetails.username || influencerDetails.display_name}</h4>
                                    <span className="platform-badge">
                                        {getPlatformIcon(influencerDetails.platform)} {influencerDetails.platform}
                                    </span>
                                </div>

                                <div className="profile-stats">
                                    <div className="stat-card">
                                        <label>Influence Score</label>
                                        <span className="stat-value" style={{
                                            color: getInfluenceLevel(influencerDetails.influence_score).color
                                        }}>
                                            {(influencerDetails.influence_score || 0).toFixed(3)}
                                        </span>
                                        <span className="stat-level">
                                            {getInfluenceLevel(influencerDetails.influence_score).level}
                                        </span>
                                    </div>

                                    <div className="stat-card">
                                        <label>Followers</label>
                                        <span className="stat-value">
                                            {(influencerDetails.followers_count || 0).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="stat-card">
                                        <label>Connections</label>
                                        <span className="stat-value">
                                            {influencerDetails.connectionCount || 0}
                                        </span>
                                    </div>

                                    <div className="stat-card">
                                        <label>Engagement Rate</label>
                                        <span className="stat-value">
                                            {influencerDetails.engagementRate || '0.00'}%
                                        </span>
                                    </div>
                                </div>

                                {influencerDetails.crossPlatformPresence &&
                                    influencerDetails.crossPlatformPresence.length > 1 && (
                                        <div className="cross-platform">
                                            <label>Cross-Platform Presence:</label>
                                            <div className="platform-list">
                                                {influencerDetails.crossPlatformPresence.map(platform => (
                                                    <span key={platform} className="platform-tag">
                                                        {getPlatformIcon(platform)} {platform}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                            </div>

                            {influencerDetails.connections && influencerDetails.connections.length > 0 && (
                                <div className="connections-section">
                                    <h4>Top Connections</h4>
                                    <div className="connections-list">
                                        {influencerDetails.connections.slice(0, 10).map((connection, idx) => (
                                            <div key={idx} className="connection-item">
                                                <span className="connection-name">{connection.username}</span>
                                                <span className="connection-type">{connection.relationship_type}</span>
                                                <span className="connection-weight">
                                                    Weight: {connection.weight}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfluencersPage;