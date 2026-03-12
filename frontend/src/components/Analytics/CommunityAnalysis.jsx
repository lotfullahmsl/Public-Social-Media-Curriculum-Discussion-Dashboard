import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './CommunityAnalysis.css';

const CommunityAnalysis = ({ communities, onCommunitySelect }) => {
    // Prepare data for charts
    const sizeDistribution = communities.map(community => ({
        name: `Community ${community.id}`,
        size: community.size || 0,
        density: community.density || 0
    }));

    const platformDistribution = communities.reduce((acc, community) => {
        const platform = community.primary_platform || 'unknown';
        const existing = acc.find(item => item.platform === platform);
        if (existing) {
            existing.count += 1;
            existing.totalMembers += community.size || 0;
        } else {
            acc.push({
                platform,
                count: 1,
                totalMembers: community.size || 0
            });
        }
        return acc;
    }, []);

    const topicDistribution = communities.reduce((acc, community) => {
        (community.dominant_topics || []).forEach(topic => {
            const existing = acc.find(item => item.topic === topic);
            if (existing) {
                existing.count += 1;
            } else {
                acc.push({ topic, count: 1 });
            }
        });
        return acc;
    }, []).sort((a, b) => b.count - a.count).slice(0, 8);

    // Colors for charts
    const COLORS = ['#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff6b6b', '#ff9ff3', '#54a0ff', '#5f27cd'];

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
        <div className="community-analysis">
            <div className="analysis-header">
                <h3>Community Analysis</h3>
                <p>Detailed insights into community structure and characteristics</p>
            </div>

            <div className="analysis-grid">
                {/* Community Size Distribution */}
                <div className="analysis-card">
                    <h4>Community Sizes</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={sizeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis
                                dataKey="name"
                                stroke="#ccc"
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis stroke="#ccc" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="size"
                                fill="#4ecdc4"
                                onClick={(data) => onCommunitySelect && onCommunitySelect(data.name.split(' ')[1])}
                                style={{ cursor: 'pointer' }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Platform Distribution */}
                <div className="analysis-card">
                    <h4>Platform Distribution</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={platformDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ platform, count }) => `${platform}: ${count}`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="count"
                            >
                                {platformDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Community Density */}
                <div className="analysis-card">
                    <h4>Community Density</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={sizeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis
                                dataKey="name"
                                stroke="#ccc"
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis stroke="#ccc" fontSize={12} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="density" fill="#45b7d1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Topic Distribution */}
                <div className="analysis-card">
                    <h4>Dominant Topics</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={topicDistribution} layout="horizontal">
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis type="number" stroke="#ccc" fontSize={12} />
                            <YAxis
                                type="category"
                                dataKey="topic"
                                stroke="#ccc"
                                fontSize={12}
                                width={80}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="count" fill="#96ceb4" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Community Summary Stats */}
            <div className="community-summary">
                <div className="summary-card">
                    <h4>Total Communities</h4>
                    <span className="summary-value">{communities.length}</span>
                </div>
                <div className="summary-card">
                    <h4>Total Members</h4>
                    <span className="summary-value">
                        {communities.reduce((sum, c) => sum + (c.size || 0), 0)}
                    </span>
                </div>
                <div className="summary-card">
                    <h4>Average Size</h4>
                    <span className="summary-value">
                        {Math.round(communities.reduce((sum, c) => sum + (c.size || 0), 0) / communities.length) || 0}
                    </span>
                </div>
                <div className="summary-card">
                    <h4>Average Density</h4>
                    <span className="summary-value">
                        {(communities.reduce((sum, c) => sum + (c.density || 0), 0) / communities.length).toFixed(2) || '0.00'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CommunityAnalysis;