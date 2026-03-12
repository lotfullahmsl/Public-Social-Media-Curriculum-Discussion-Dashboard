import { useState } from 'react';
import CommunityAnalysis from '../components/Analytics/CommunityAnalysis';
import NetworkGraph from '../components/Graph/NetworkGraph';
import useCommunities from '../hooks/useCommunities';
import './CommunitiesPage.css';

const CommunitiesPage = () => {
    const {
        communities,
        selectedCommunity,
        communityDetails,
        loading,
        error,
        selectCommunity,
        communityStats,
        communitiesByPlatform
    } = useCommunities();

    const [viewMode, setViewMode] = useState('overview'); // 'overview', 'analysis', 'graph'
    const [selectedPlatform, setSelectedPlatform] = useState('');

    // Filter communities by platform
    const filteredCommunities = selectedPlatform
        ? communities.filter(c => c.primary_platform === selectedPlatform)
        : communities;

    // Get unique platforms
    const platforms = [...new Set(communities.map(c => c.primary_platform).filter(Boolean))];

    const handleCommunitySelect = (communityId) => {
        selectCommunity(communityId);
        setViewMode('graph');
    };

    const getCommunityColor = (index) => {
        const colors = ['#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd'];
        return colors[index % colors.length];
    };

    if (loading && !communities.length) {
        return (
            <div className="communities-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading communities...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="communities-page">
                <div className="error-container">
                    <h3>Error Loading Communities</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="communities-page">
            <div className="communities-header">
                <div className="header-left">
                    <h1>Community Analysis</h1>
                    <p>Discover and analyze user communities within the social network</p>
                </div>
                <div className="header-stats">
                    <div className="stat-item">
                        <span className="stat-value">{communityStats.totalCommunities || 0}</span>
                        <span className="stat-label">Communities</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{communityStats.totalMembers || 0}</span>
                        <span className="stat-label">Total Members</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{communityStats.averageSize || 0}</span>
                        <span className="stat-label">Avg Size</span>
                    </div>
                </div>
            </div>

            <div className="communities-controls">
                <div className="control-group">
                    <label>View Mode:</label>
                    <div className="button-group">
                        <button
                            className={viewMode === 'overview' ? 'active' : ''}
                            onClick={() => setViewMode('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={viewMode === 'analysis' ? 'active' : ''}
                            onClick={() => setViewMode('analysis')}
                        >
                            Analysis
                        </button>
                        <button
                            className={viewMode === 'graph' ? 'active' : ''}
                            onClick={() => setViewMode('graph')}
                            disabled={!selectedCommunity}
                        >
                            Community Graph
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <label>Platform Filter:</label>
                    <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                    >
                        <option value="">All Platforms</option>
                        {platforms.map(platform => (
                            <option key={platform} value={platform}>
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="communities-content">
                {viewMode === 'overview' && (
                    <div className="communities-overview">
                        <div className="communities-grid">
                            {filteredCommunities.map((community, index) => (
                                <div
                                    key={community.id}
                                    className="community-card"
                                    onClick={() => handleCommunitySelect(community.id)}
                                    style={{ borderLeftColor: getCommunityColor(index) }}
                                >
                                    <div className="community-header">
                                        <h3>Community {community.id}</h3>
                                        <span className="platform-badge">
                                            {community.primary_platform || 'Mixed'}
                                        </span>
                                    </div>

                                    <div className="community-stats">
                                        <div className="stat">
                                            <label>Members</label>
                                            <span>{community.size || 0}</span>
                                        </div>
                                        <div className="stat">
                                            <label>Density</label>
                                            <span>{(community.density || 0).toFixed(2)}</span>
                                        </div>
                                        <div className="stat">
                                            <label>Activity</label>
                                            <span className={`activity-level ${community.activity_level || 'low'}`}>
                                                {community.activity_level || 'Low'}
                                            </span>
                                        </div>
                                    </div>

                                    {community.dominant_topics && community.dominant_topics.length > 0 && (
                                        <div className="community-topics">
                                            <label>Topics:</label>
                                            <div className="topics-list">
                                                {community.dominant_topics.slice(0, 3).map((topic, idx) => (
                                                    <span key={idx} className="topic-tag">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="community-preview">
                                        <div className="member-count">
                                            {community.size || 0} members
                                        </div>
                                        <div className="view-button">
                                            View Details →
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Platform Distribution */}
                        <div className="platform-distribution">
                            <h3>Communities by Platform</h3>
                            <div className="platform-grid">
                                {Object.entries(communitiesByPlatform).map(([platform, platformCommunities]) => (
                                    <div key={platform} className="platform-card">
                                        <h4>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                                        <div className="platform-stats">
                                            <span className="community-count">
                                                {platformCommunities.length} communities
                                            </span>
                                            <span className="member-count">
                                                {platformCommunities.reduce((sum, c) => sum + (c.size || 0), 0)} members
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'analysis' && (
                    <CommunityAnalysis
                        communities={filteredCommunities}
                        onCommunitySelect={handleCommunitySelect}
                    />
                )}

                {viewMode === 'graph' && selectedCommunity && communityDetails && (
                    <div className="community-graph-view">
                        <div className="graph-header">
                            <h3>Community {selectedCommunity} Network</h3>
                            <div className="community-info">
                                <span>Members: {communityDetails.size || 0}</span>
                                <span>Density: {(communityDetails.density || 0).toFixed(2)}</span>
                                <span>Platform: {communityDetails.primary_platform || 'Mixed'}</span>
                            </div>
                        </div>

                        <div className="graph-container">
                            <NetworkGraph
                                graphData={communityDetails.graph || { nodes: [], links: [] }}
                                selectedCommunity={selectedCommunity}
                                width={window.innerWidth - 100}
                                height={600}
                            />
                        </div>

                        {communityDetails.memberDetails && communityDetails.memberDetails.length > 0 && (
                            <div className="community-members">
                                <h4>Community Members</h4>
                                <div className="members-grid">
                                    {communityDetails.memberDetails.slice(0, 12).map(member => (
                                        <div key={member.id} className="member-card">
                                            <div className="member-info">
                                                <h5>{member.username || member.display_name}</h5>
                                                <span className="member-platform">{member.platform}</span>
                                            </div>
                                            <div className="member-stats">
                                                <span>Influence: {(member.influence_score || 0).toFixed(2)}</span>
                                                <span>Connections: {member.connections || 0}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunitiesPage;