import { useEffect, useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import './UserConnections.css';

const UserConnections = ({ userId }) => {
    const [connections, setConnections] = useState([]);
    const [networkMetrics, setNetworkMetrics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getUserConnections } = useUsers();

    useEffect(() => {
        const fetchConnections = async () => {
            if (!userId) return;

            try {
                setLoading(true);
                setError(null);
                const data = await getUserConnections(userId);
                setConnections(data.connections || []);
                setNetworkMetrics(data.networkMetrics || {});
            } catch (err) {
                setError(err.message || 'Failed to load connections');
                console.error('Error fetching connections:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [userId, getUserConnections]);

    if (loading) {
        return (
            <div className="user-connections">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading connections...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-connections">
                <div className="error-container">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    const getRelationshipIcon = (relationship) => {
        switch (relationship) {
            case 'mutual':
                return 'fa-exchange-alt';
            case 'follows':
                return 'fa-arrow-right';
            case 'followed_by':
                return 'fa-arrow-left';
            default:
                return 'fa-link';
        }
    };

    const getRelationshipColor = (relationship) => {
        switch (relationship) {
            case 'mutual':
                return '#4caf50';
            case 'follows':
                return '#2196f3';
            case 'followed_by':
                return '#ff9800';
            default:
                return '#9e9e9e';
        }
    };

    const getStrengthColor = (strength) => {
        if (strength >= 0.8) return '#4caf50';
        if (strength >= 0.6) return '#8bc34a';
        if (strength >= 0.4) return '#ff9800';
        return '#f44336';
    };

    return (
        <div className="user-connections">
            <div className="connections-header">
                <h2>Network Analysis</h2>
                <p>User connections and network position</p>
            </div>

            <div className="network-metrics">
                <h3>Network Metrics</h3>
                <div className="metrics-grid">
                    <div className="metric-item">
                        <i className="fas fa-bullseye"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {(networkMetrics.degreeCentrality * 100)?.toFixed(1) || '0.0'}%
                            </span>
                            <span className="metric-label">Degree Centrality</span>
                        </div>
                    </div>

                    <div className="metric-item">
                        <i className="fas fa-route"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {(networkMetrics.betweennessCentrality * 100)?.toFixed(1) || '0.0'}%
                            </span>
                            <span className="metric-label">Betweenness Centrality</span>
                        </div>
                    </div>

                    <div className="metric-item">
                        <i className="fas fa-compress-arrows-alt"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {(networkMetrics.closenessCentrality * 100)?.toFixed(1) || '0.0'}%
                            </span>
                            <span className="metric-label">Closeness Centrality</span>
                        </div>
                    </div>

                    <div className="metric-item">
                        <i className="fas fa-project-diagram"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {(networkMetrics.clusteringCoefficient * 100)?.toFixed(1) || '0.0'}%
                            </span>
                            <span className="metric-label">Clustering Coefficient</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="connections-list">
                <h3>Direct Connections ({connections.length})</h3>

                {connections.length === 0 ? (
                    <div className="no-connections">
                        <i className="fas fa-unlink"></i>
                        <p>No connections found</p>
                    </div>
                ) : (
                    <div className="connections-grid">
                        {connections.map((connection, index) => (
                            <div key={connection.id || index} className="connection-card">
                                <div className="connection-avatar">
                                    <i className="fas fa-user"></i>
                                </div>

                                <div className="connection-info">
                                    <h4 className="connection-username">@{connection.username}</h4>

                                    <div className="connection-relationship">
                                        <i
                                            className={`fas ${getRelationshipIcon(connection.relationship)}`}
                                            style={{ color: getRelationshipColor(connection.relationship) }}
                                        ></i>
                                        <span>{connection.relationship}</span>
                                    </div>

                                    <div className="connection-strength">
                                        <label>Connection Strength</label>
                                        <div className="strength-bar">
                                            <div
                                                className="strength-fill"
                                                style={{
                                                    width: `${(connection.strength || 0) * 100}%`,
                                                    backgroundColor: getStrengthColor(connection.strength || 0)
                                                }}
                                            ></div>
                                        </div>
                                        <span className="strength-value">
                                            {((connection.strength || 0) * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="network-insights">
                <h3>Network Insights</h3>
                <div className="insights-grid">
                    <div className="insight-card">
                        <i className="fas fa-crown"></i>
                        <div className="insight-content">
                            <h4>Network Position</h4>
                            <p>
                                {networkMetrics.degreeCentrality > 0.5
                                    ? 'Highly connected hub user'
                                    : networkMetrics.degreeCentrality > 0.2
                                        ? 'Well-connected user'
                                        : 'Peripheral user'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <i className="fas fa-bridge"></i>
                        <div className="insight-content">
                            <h4>Bridge Role</h4>
                            <p>
                                {networkMetrics.betweennessCentrality > 0.3
                                    ? 'Important bridge between communities'
                                    : networkMetrics.betweennessCentrality > 0.1
                                        ? 'Moderate bridging role'
                                        : 'Limited bridging influence'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <i className="fas fa-users"></i>
                        <div className="insight-content">
                            <h4>Community Integration</h4>
                            <p>
                                {networkMetrics.clusteringCoefficient > 0.6
                                    ? 'Highly integrated in community'
                                    : networkMetrics.clusteringCoefficient > 0.3
                                        ? 'Moderately integrated'
                                        : 'Loosely connected'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserConnections;