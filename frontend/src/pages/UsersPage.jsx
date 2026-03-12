import { useState } from 'react';
import UserConnections from '../components/Users/UserConnections';
import UserProfile from '../components/Users/UserProfile';
import UserSearch from '../components/Users/UserSearch';
import { useUsers } from '../hooks/useUsers';
import './UsersPage.css';

const UsersPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [sortBy, setSortBy] = useState('influence');
    const [viewMode, setViewMode] = useState('grid');

    const { users, loading, error, searchUsers } = useUsers({
        query: searchQuery,
        platform: platformFilter,
        sortBy: sortBy
    });

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        searchUsers(query);
    };

    if (loading) {
        return (
            <div className="users-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading user profiles...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="users-page">
                <div className="error-container">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>Error loading users: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-page">
            <div className="page-header">
                <h1>User Analysis</h1>
                <p>Explore individual user profiles and network connections</p>
            </div>

            <div className="users-controls">
                <UserSearch
                    onSearch={handleSearch}
                    placeholder="Search users by name or username..."
                />

                <div className="filter-controls">
                    <select
                        value={platformFilter}
                        onChange={(e) => setPlatformFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="all">All Platforms</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                    </select>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="filter-select"
                    >
                        <option value="influence">Influence Score</option>
                        <option value="connections">Connections</option>
                        <option value="activity">Activity Level</option>
                        <option value="centrality">Centrality</option>
                    </select>

                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="fas fa-th"></i>
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <i className="fas fa-list"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="users-content">
                {selectedUser ? (
                    <div className="user-detail-view">
                        <button
                            className="back-button"
                            onClick={() => setSelectedUser(null)}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Back to Users
                        </button>

                        <div className="user-detail-content">
                            <UserProfile user={selectedUser} />
                            <UserConnections userId={selectedUser.id} />
                        </div>
                    </div>
                ) : (
                    <div className={`users-grid ${viewMode}`}>
                        {users.map(user => (
                            <div
                                key={user.id}
                                className="user-card"
                                onClick={() => handleUserSelect(user)}
                            >
                                <div className="user-avatar">
                                    <i className="fas fa-user"></i>
                                    <div className="platform-badges">
                                        {user.platforms?.map(platform => (
                                            <span key={platform} className={`platform-badge ${platform}`}>
                                                {platform.charAt(0).toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="user-info">
                                    <h3 className="user-name">{user.displayName}</h3>
                                    <p className="user-username">@{user.username}</p>

                                    <div className="user-metrics">
                                        <div className="metric">
                                            <i className="fas fa-star"></i>
                                            <span>Influence: {user.influenceScore?.toFixed(2) || '0.00'}</span>
                                        </div>
                                        <div className="metric">
                                            <i className="fas fa-share-alt"></i>
                                            <span>Connections: {user.connectionsCount || 0}</span>
                                        </div>
                                        <div className="metric">
                                            <i className="fas fa-chart-line"></i>
                                            <span>Activity: {user.activityLevel || 'Low'}</span>
                                        </div>
                                    </div>

                                    <div className="user-stats">
                                        <div className="stat">
                                            <label>Posts</label>
                                            <span>{user.postsCount || 0}</span>
                                        </div>
                                        <div className="stat">
                                            <label>Engagement</label>
                                            <span>{user.avgEngagement || 0}</span>
                                        </div>
                                        <div className="stat">
                                            <label>Community</label>
                                            <span>{user.communityId || 'None'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="user-actions">
                                    <button className="action-btn primary">
                                        <i className="fas fa-eye"></i>
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {!selectedUser && (
                <div className="users-summary">
                    <div className="summary-stats">
                        <div className="stat-card">
                            <i className="fas fa-users"></i>
                            <div className="stat-content">
                                <span className="stat-value">{users.length}</span>
                                <span className="stat-label">Total Users</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-crown"></i>
                            <div className="stat-content">
                                <span className="stat-value">{users.filter(u => u.influenceScore > 0.7).length}</span>
                                <span className="stat-label">High Influence</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-link"></i>
                            <div className="stat-content">
                                <span className="stat-value">{users.filter(u => u.platforms?.length > 1).length}</span>
                                <span className="stat-label">Multi-Platform</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="fas fa-fire"></i>
                            <div className="stat-content">
                                <span className="stat-value">{users.filter(u => u.activityLevel === 'High').length}</span>
                                <span className="stat-label">Highly Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;