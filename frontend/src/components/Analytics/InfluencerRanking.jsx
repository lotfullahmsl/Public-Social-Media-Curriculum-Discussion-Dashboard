import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './InfluencerRanking.css';

const InfluencerRanking = ({ influencers, onInfluencerSelect, influenceTrends }) => {
    const [sortBy, setSortBy] = useState('influence_score');
    const [filterPlatform, setFilterPlatform] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list', 'chart', 'trends'

    // Sort and filter influencers
    const processedInfluencers = influencers
        .filter(inf => !filterPlatform || inf.platform === filterPlatform)
        .sort((a, b) => {
            switch (sortBy) {
                case 'influence_score':
                    return (b.influence_score || 0) - (a.influence_score || 0);
                case 'followers_count':
                    return (b.followers_count || 0) - (a.followers_count || 0);
                case 'connections':
                    return (b.connections || 0) - (a.connections || 0);
                default:
                    return 0;
            }
        });

    // Get unique platforms
    const platforms = [...new Set(influencers.map(inf => inf.platform).filter(Boolean))];

    // Prepare chart data
    const chartData = processedInfluencers.slice(0, 15).map((inf, index) => ({
        rank: index + 1,
        username: inf.username || inf.display_name || `User ${inf.id}`,
        influence_score: inf.influence_score || 0,
        followers: inf.followers_count || 0,
        connections: inf.connections || 0
    }));

    const getInfluenceLevel = (score) => {
        if (score >= 0.8) return 'Expert';
        if (score >= 0.6) return 'Influencer';
        if (score >= 0.4) return 'Active';
        if (score >= 0.2) return 'Emerging';
        return 'Beginner';
    };

    const getInfluenceLevelColor = (score) => {
        if (score >= 0.8) return '#ff6b6b';
        if (score >= 0.6) return '#4ecdc4';
        if (score >= 0.4) return '#45b7d1';
        if (score >= 0.2) return '#96ceb4';
        return '#feca57';
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-label">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="tooltip-value" style={{ color: entry.color }}>
                            {`${entry.dataKey}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="influencer-ranking">
            <div className="ranking-header">
                <h3>Influencer Ranking</h3>
                <p>Top users ranked by influence score and network centrality</p>
            </div>

            {/* Controls */}
            <div className="ranking-controls">
                <div className="control-group">
                    <label>View Mode:</label>
                    <div className="button-group">
                        <button
                            className={viewMode === 'list' ? 'active' : ''}
                            onClick={() => setViewMode('list')}
                        >
                            List View
                        </button>
                        <button
                            className={viewMode === 'chart' ? 'active' : ''}
                            onClick={() => setViewMode('chart')}
                        >
                            Chart View
                        </button>
                        <button
                            className={viewMode === 'trends' ? 'active' : ''}
                            onClick={() => setViewMode('trends')}
                        >
                            Trends
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <label>Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="influence_score">Influence Score</option>
                        <option value="followers_count">Followers</option>
                        <option value="connections">Connections</option>
                    </select>
                </div>

                <div className="control-group">
                    <label>Platform:</label>
                    <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
                        <option value="">All Platforms</option>
                        {platforms.map(platform => (
                            <option key={platform} value={platform}>
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Content based on view mode */}
            {viewMode === 'list' && (
                <div className="influencer-list">
                    {processedInfluencers.slice(0, 50).map((influencer, index) => (
                        <div
                            key={influencer.id || influencer.user_id || index}
                            className="influencer-card"
                            onClick={() => onInfluencerSelect && onInfluencerSelect(influencer.id || influencer.user_id)}
                        >
                            <div className="rank-badge">
                                #{index + 1}
                            </div>

                            <div className="influencer-info">
                                <div className="user-header">
                                    <h4>{influencer.username || influencer.display_name || `User ${influencer.id}`}</h4>
                                    <span className="platform-badge">
                                        {getPlatformIcon(influencer.platform)} {influencer.platform}
                                    </span>
                                </div>

                                <div className="user-stats">
                                    <div className="stat">
                                        <label>Influence Score</label>
                                        <span
                                            className="influence-score"
                                            style={{ color: getInfluenceLevelColor(influencer.influence_score) }}
                                        >
                                            {(influencer.influence_score || 0).toFixed(3)}
                                        </span>
                                    </div>

                                    <div className="stat">
                                        <label>Level</label>
                                        <span className="influence-level">
                                            {getInfluenceLevel(influencer.influence_score)}
                                        </span>
                                    </div>

                                    <div className="stat">
                                        <label>Followers</label>
                                        <span>{(influencer.followers_count || 0).toLocaleString()}</span>
                                    </div>

                                    <div className="stat">
                                        <label>Connections</label>
                                        <span>{influencer.connections || 0}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="influence-bar">
                                <div
                                    className="influence-fill"
                                    style={{
                                        width: `${(influencer.influence_score || 0) * 100}%`,
                                        backgroundColor: getInfluenceLevelColor(influencer.influence_score)
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === 'chart' && (
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis
                                dataKey="username"
                                stroke="#ccc"
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={100}
                            />
                            <YAxis stroke="#ccc" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="influence_score" fill="#4ecdc4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {viewMode === 'trends' && influenceTrends && (
                <div className="trends-container">
                    <h4>Influence Trends</h4>
                    <div className="trends-list">
                        {influenceTrends.map((trend, index) => (
                            <div key={index} className="trend-item">
                                <div className="trend-user">
                                    <span className="trend-rank">#{index + 1}</span>
                                    <span className="trend-username">{trend.username}</span>
                                </div>

                                <div className="trend-scores">
                                    <span className="current-score">{trend.current_score?.toFixed(3)}</span>
                                    <span className={`trend-change ${trend.trend}`}>
                                        {trend.trend === 'up' ? '↗' : '↘'} {Math.abs(parseFloat(trend.change)).toFixed(3)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Summary Statistics */}
            <div className="ranking-summary">
                <div className="summary-card">
                    <h4>Total Influencers</h4>
                    <span className="summary-value">{processedInfluencers.length}</span>
                </div>

                <div className="summary-card">
                    <h4>Top Influence Score</h4>
                    <span className="summary-value">
                        {processedInfluencers.length > 0 ?
                            (processedInfluencers[0].influence_score || 0).toFixed(3) : '0.000'}
                    </span>
                </div>

                <div className="summary-card">
                    <h4>Average Score</h4>
                    <span className="summary-value">
                        {processedInfluencers.length > 0 ?
                            (processedInfluencers.reduce((sum, inf) => sum + (inf.influence_score || 0), 0) /
                                processedInfluencers.length).toFixed(3) : '0.000'}
                    </span>
                </div>

                <div className="summary-card">
                    <h4>Platforms</h4>
                    <span className="summary-value">{platforms.length}</span>
                </div>
            </div>
        </div>
    );
};

export default InfluencerRanking;