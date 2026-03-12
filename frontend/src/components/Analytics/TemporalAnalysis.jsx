import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './TemporalAnalysis.css';

const TemporalAnalysis = ({ data = {} }) => {
    const { timeline = [], peakHours = [], weeklyPattern = {} } = data;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const weeklyData = Object.entries(weeklyPattern).map(([day, value]) => ({
        day,
        activity: value
    }));

    const peakHoursData = peakHours.map((hour, index) => ({
        hour,
        activity: 100 - (index * 15) // Mock decreasing activity
    }));

    return (
        <div className="temporal-analysis">
            <div className="analysis-header">
                <h2>Temporal Analysis</h2>
                <p>Activity patterns and trends over time</p>
            </div>

            <div className="timeline-section">
                <h3>Activity Timeline</h3>
                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={timeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis
                                dataKey="date"
                                stroke="#b0b0b0"
                                fontSize={12}
                                tickFormatter={formatDate}
                            />
                            <YAxis
                                stroke="#b0b0b0"
                                fontSize={12}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(0,0,0,0.8)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px',
                                    color: '#ffffff'
                                }}
                                labelFormatter={(value) => formatDate(value)}
                            />
                            <Line
                                type="monotone"
                                dataKey="posts"
                                stroke="#667eea"
                                strokeWidth={3}
                                dot={{ fill: '#667eea', strokeWidth: 2, r: 4 }}
                                name="Posts"
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#764ba2"
                                strokeWidth={3}
                                dot={{ fill: '#764ba2', strokeWidth: 2, r: 4 }}
                                name="Active Users"
                            />
                            <Line
                                type="monotone"
                                dataKey="engagement"
                                stroke="#f093fb"
                                strokeWidth={3}
                                dot={{ fill: '#f093fb', strokeWidth: 2, r: 4 }}
                                name="Engagement"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="patterns-grid">
                <div className="pattern-section">
                    <h3>Weekly Activity Pattern</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="day"
                                    stroke="#b0b0b0"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#b0b0b0"
                                    fontSize={12}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '8px',
                                        color: '#ffffff'
                                    }}
                                />
                                <Bar
                                    dataKey="activity"
                                    fill="#667eea"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="pattern-section">
                    <h3>Peak Activity Hours</h3>
                    <div className="peak-hours-list">
                        {peakHoursData.map((item, index) => (
                            <div key={index} className="peak-hour-item">
                                <div className="hour-info">
                                    <span className="hour-time">{item.hour}</span>
                                    <span className="hour-rank">#{index + 1}</span>
                                </div>
                                <div className="activity-bar">
                                    <div
                                        className="activity-fill"
                                        style={{ width: `${item.activity}%` }}
                                    ></div>
                                </div>
                                <span className="activity-value">{item.activity}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="insights-section">
                <h3>Temporal Insights</h3>
                <div className="insights-grid">
                    <div className="insight-card">
                        <i className="fas fa-clock"></i>
                        <div className="insight-content">
                            <h4>Peak Activity</h4>
                            <p>Most active during {peakHours[0] || 'afternoon hours'} with highest engagement rates</p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <i className="fas fa-calendar-week"></i>
                        <div className="insight-content">
                            <h4>Weekly Pattern</h4>
                            <p>
                                {Object.entries(weeklyPattern).reduce((a, b) =>
                                    weeklyPattern[a] > weeklyPattern[b[0]] ? a : b[0],
                                    Object.keys(weeklyPattern)[0]
                                )} shows highest activity levels
                            </p>
                        </div>
                    </div>

                    <div className="insight-card">
                        <i className="fas fa-trending-up"></i>
                        <div className="insight-content">
                            <h4>Growth Trend</h4>
                            <p>
                                {timeline.length > 1 && timeline[timeline.length - 1].posts > timeline[0].posts
                                    ? 'Positive growth trend in recent activity'
                                    : 'Stable activity levels maintained'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemporalAnalysis;