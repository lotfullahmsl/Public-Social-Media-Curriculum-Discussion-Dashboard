import './UserProfile.css';

const UserProfile = ({ user }) => {
    if (!user) {
        return (
            <div className="user-profile">
                <div className="no-user">
                    <i className="fas fa-user-slash"></i>
                    <p>No user selected</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <i className="fas fa-user"></i>
                    {user.profile?.verified && (
                        <div className="verified-badge">
                            <i className="fas fa-check"></i>
                        </div>
                    )}
                </div>

                <div className="profile-info">
                    <h2 className="profile-name">{user.displayName}</h2>
                    <p className="profile-username">@{user.username}</p>

                    <div className="platform-badges">
                        {user.platforms?.map(platform => (
                            <span key={platform} className={`platform-badge ${platform}`}>
                                <i className={`fab fa-${platform}`}></i>
                                {platform}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile-bio">
                <p>{user.profile?.bio || 'No bio available'}</p>
                {user.profile?.location && (
                    <div className="profile-location">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{user.profile.location}</span>
                    </div>
                )}
            </div>

            <div className="profile-metrics">
                <div className="metrics-grid">
                    <div className="metric-card">
                        <i className="fas fa-star"></i>
                        <div className="metric-content">
                            <span className="metric-value">{user.influenceScore?.toFixed(2) || '0.00'}</span>
                            <span className="metric-label">Influence Score</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-share-alt"></i>
                        <div className="metric-content">
                            <span className="metric-value">{user.connectionsCount || 0}</span>
                            <span className="metric-label">Connections</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-edit"></i>
                        <div className="metric-content">
                            <span className="metric-value">{user.postsCount || 0}</span>
                            <span className="metric-label">Posts</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-heart"></i>
                        <div className="metric-content">
                            <span className="metric-value">{user.avgEngagement || 0}</span>
                            <span className="metric-label">Avg Engagement</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-stats">
                <h3>Social Media Stats</h3>
                <div className="stats-grid">
                    <div className="stat-item">
                        <label>Followers</label>
                        <span>{user.profile?.followers?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-item">
                        <label>Following</label>
                        <span>{user.profile?.following?.toLocaleString() || 0}</span>
                    </div>
                    <div className="stat-item">
                        <label>Activity Level</label>
                        <span className={`activity-level ${user.activityLevel?.toLowerCase()}`}>
                            {user.activityLevel || 'Unknown'}
                        </span>
                    </div>
                    <div className="stat-item">
                        <label>Community</label>
                        <span>{user.communityId || 'None'}</span>
                    </div>
                </div>
            </div>

            <div className="profile-actions">
                <button className="action-button primary">
                    <i className="fas fa-chart-line"></i>
                    View Network Analysis
                </button>
                <button className="action-button secondary">
                    <i className="fas fa-users"></i>
                    View Community
                </button>
            </div>
        </div>
    );
};

export default UserProfile;