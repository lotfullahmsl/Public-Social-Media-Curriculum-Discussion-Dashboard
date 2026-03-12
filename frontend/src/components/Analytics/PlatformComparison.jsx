import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './PlatformComparison.css';

const PlatformComparison = ({ data = [] }) => {
    const COLORS = ['#1da1f2', '#e4405f', '#4267b2'];

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <div className="platform-comparison">
            <div className="comparison-header">
                <h2>Cross-Platform Analysis</h2>
                <p>Compare activity and engagement across social media platforms</p>
            </div>

            <div className="platform-metrics-grid">
                {data.map((platform, index) => (
                    <div key={platform.name} className="platform-metric-card">
                        <div className="platform-header">
                            <div
                                className="platform-icon"
                                style={{ backgroundColor: platform.color }}
                            >
                                <i className={`fab fa-${platform.name.toLowerCase()}`}></i>
                            </div>
                            <h3>{platform.name}</h3>
                        </div>

                        <div className="platform-stats">
                            <div className="stat">
                                <span className="stat-value">{formatNumber(platform.posts_count)}</span>
                                <span className="stat-label">Posts</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{formatNumber(platform.users_count)}</span>
                                <span className="stat-label">Users</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{platform.avg_engagement}</span>
                                <span className="stat-label">Avg Engagement</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3>Posts Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="name"
                                stroke="#b0b0b0"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#b0b0b0"
                                fontSize={12}
                                tickFormatter={formatNumber}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    color: '#ffffff'
                                }}
                                formatter={(value) => [formatNumber(value), 'Posts']}
                            />
                            <Bar
                                dataKey="posts_count"
                                fill="#667eea"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3>User Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="users_count"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    color: '#ffffff'
                                }}
                                formatter={(value) => [formatNumber(value), 'Users']}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="engagement-comparison">
                <h3>Engagement Comparison</h3>
                <div className="engagement-bars">
                    {data.map((platform, index) => (
                        <div key={platform.name} className="engagement-bar">
                            <div className="engagement-info">
                                <span className="platform-name">{platform.name}</span>
                                <span className="engagement-value">{platform.avg_engagement}</span>
                            </div>
                            <div className="bar-container">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${(platform.avg_engagement / Math.max(...data.map(p => p.avg_engagement))) * 100}%`,
                                        backgroundColor: platform.color
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlatformComparison;