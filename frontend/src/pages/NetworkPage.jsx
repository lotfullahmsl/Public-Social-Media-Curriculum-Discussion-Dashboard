import { useCallback, useState } from 'react';
import NetworkGraph from '../components/Graph/NetworkGraph';
import useGraph from '../hooks/useGraph';
import './NetworkPage.css';

const NetworkPage = () => {
    const {
        graphData,
        loading,
        error,
        filters,
        selectedNode,
        selectedCommunity,
        updateFilters,
        analyzeGraph,
        getUserConnections,
        filterByCommunity,
        getTopInfluencers,
        setSelectedNode,
        setSelectedCommunity,
        nodeCount,
        linkCount,
        communityCount
    } = useGraph();

    const [showControls, setShowControls] = useState(true);
    const [showLegend, setShowLegend] = useState(true);
    const [showStats, setShowStats] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState('full'); // 'full', 'community', 'influence'

    // Handle node click
    const handleNodeClick = useCallback(async (node) => {
        setSelectedNode(node);
        setSelectedUser(node);

        // Fetch user connections
        try {
            const connections = await getUserConnections(node.id);
            setSelectedUser({
                ...node,
                connections
            });
        } catch (error) {
            console.error('Failed to fetch user connections:', error);
        }
    }, [getUserConnections, setSelectedNode]);

    // Handle link click
    const handleLinkClick = useCallback((link) => {
        console.log('Link clicked:', link);
        // Could show interaction details
    }, []);

    // Filter by platform
    const handlePlatformFilter = useCallback((platform) => {
        updateFilters({ platform });
    }, [updateFilters]);

    // Filter by community
    const handleCommunityFilter = useCallback((communityId) => {
        setSelectedCommunity(communityId);
        setViewMode('community');
    }, [setSelectedCommunity]);

    // Reset filters
    const handleResetFilters = useCallback(() => {
        updateFilters({});
        setSelectedCommunity(null);
        setSelectedNode(null);
        setSelectedUser(null);
        setViewMode('full');
    }, [updateFilters, setSelectedCommunity, setSelectedNode]);

    // Get filtered graph data based on view mode
    const getFilteredGraphData = useCallback(() => {
        switch (viewMode) {
            case 'community':
                return selectedCommunity ? filterByCommunity(selectedCommunity) : graphData;
            case 'influence':
                const topInfluencers = getTopInfluencers(50);
                const influencerIds = new Set(topInfluencers.map(node => node.id));
                return {
                    nodes: graphData.nodes.filter(node => influencerIds.has(node.id)),
                    links: graphData.links.filter(link =>
                        influencerIds.has(link.source.id || link.source) &&
                        influencerIds.has(link.target.id || link.target)
                    )
                };
            default:
                return graphData;
        }
    }, [viewMode, selectedCommunity, filterByCommunity, graphData, getTopInfluencers]);

    const filteredGraphData = getFilteredGraphData();

    if (loading && !graphData.nodes.length) {
        return (
            <div className="network-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading network graph...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="network-page">
                <div className="error-container">
                    <h3>Error Loading Network</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="network-page">
            <div className="network-header">
                <div className="header-left">
                    <h1>Social Network Graph</h1>
                    <p>Interactive visualization of user interactions and communities</p>
                </div>
                <div className="header-right">
                    <button
                        onClick={analyzeGraph}
                        disabled={loading}
                        className="analyze-btn"
                    >
                        {loading ? 'Analyzing...' : 'Refresh Analysis'}
                    </button>
                </div>
            </div>

            <div className="network-content">
                <div className="graph-container">
                    <NetworkGraph
                        graphData={filteredGraphData}
                        onNodeClick={handleNodeClick}
                        onLinkClick={handleLinkClick}
                        selectedNode={selectedNode}
                        selectedCommunity={selectedCommunity}
                        width={window.innerWidth - 300}
                        height={window.innerHeight - 200}
                    />

                    {/* Graph Controls */}
                    {showControls && (
                        <div className="graph-controls-overlay">
                            <div className="control-group">
                                <label>View Mode:</label>
                                <button
                                    className={viewMode === 'full' ? 'active' : ''}
                                    onClick={() => setViewMode('full')}
                                >
                                    Full Network
                                </button>
                                <button
                                    className={viewMode === 'community' ? 'active' : ''}
                                    onClick={() => setViewMode('community')}
                                >
                                    Communities
                                </button>
                                <button
                                    className={viewMode === 'influence' ? 'active' : ''}
                                    onClick={() => setViewMode('influence')}
                                >
                                    Top Influencers
                                </button>
                            </div>

                            <div className="control-group">
                                <label>Platform:</label>
                                <button onClick={() => handlePlatformFilter('')}>All</button>
                                <button onClick={() => handlePlatformFilter('twitter')}>Twitter</button>
                                <button onClick={() => handlePlatformFilter('instagram')}>Instagram</button>
                                <button onClick={() => handlePlatformFilter('facebook')}>Facebook</button>
                            </div>

                            <div className="control-group">
                                <button onClick={handleResetFilters}>Reset Filters</button>
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    {showLegend && graphData.communities.length > 0 && (
                        <div className="graph-legend">
                            <h4>Communities</h4>
                            {graphData.communities.slice(0, 10).map((community, index) => (
                                <div
                                    key={community.id}
                                    className="legend-item"
                                    onClick={() => handleCommunityFilter(community.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div
                                        className="legend-color"
                                        style={{
                                            backgroundColor: `hsl(${(index * 137.5) % 360}, 70%, 60%)`
                                        }}
                                    ></div>
                                    <span className="legend-text">
                                        Community {community.id} ({community.size || 0} members)
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    {showStats && (
                        <div className="graph-stats">
                            <h4>Network Stats</h4>
                            <div className="stat-item">
                                <span className="stat-label">Nodes:</span>
                                <span className="stat-value">{filteredGraphData.nodes.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Connections:</span>
                                <span className="stat-value">{filteredGraphData.links.length}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Communities:</span>
                                <span className="stat-value">{communityCount}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Density:</span>
                                <span className="stat-value">
                                    {nodeCount > 1 ? ((linkCount * 2) / (nodeCount * (nodeCount - 1)) * 100).toFixed(1) + '%' : '0%'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Toggle buttons */}
                    <div className="toggle-controls">
                        <button onClick={() => setShowControls(!showControls)}>
                            {showControls ? 'Hide Controls' : 'Show Controls'}
                        </button>
                        <button onClick={() => setShowLegend(!showLegend)}>
                            {showLegend ? 'Hide Legend' : 'Show Legend'}
                        </button>
                        <button onClick={() => setShowStats(!showStats)}>
                            {showStats ? 'Hide Stats' : 'Show Stats'}
                        </button>
                    </div>
                </div>

                {/* User Details Panel */}
                {selectedUser && (
                    <div className="user-details-panel">
                        <div className="panel-header">
                            <h3>User Details</h3>
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="close-btn"
                            >
                                ×
                            </button>
                        </div>

                        <div className="user-info">
                            <h4>{selectedUser.username || selectedUser.id}</h4>
                            <p><strong>Display Name:</strong> {selectedUser.display_name || 'N/A'}</p>
                            <p><strong>Platform:</strong> {selectedUser.platform || 'Unknown'}</p>
                            <p><strong>Community:</strong> {selectedUser.community || 'None'}</p>
                            <p><strong>Influence Score:</strong> {(selectedUser.influence_score || 0).toFixed(2)}</p>
                            <p><strong>Connections:</strong> {selectedUser.connections?.length || 0}</p>
                        </div>

                        {selectedUser.connections && selectedUser.connections.length > 0 && (
                            <div className="user-connections">
                                <h4>Top Connections</h4>
                                <div className="connections-list">
                                    {selectedUser.connections.slice(0, 10).map(connection => (
                                        <div key={connection.id} className="connection-item">
                                            <span className="connection-name">{connection.username}</span>
                                            <span className="connection-type">{connection.relationship_type}</span>
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

export default NetworkPage;