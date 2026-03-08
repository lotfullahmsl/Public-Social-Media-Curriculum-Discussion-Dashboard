// Engagement chart component
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockStats } from '../../data/mockData';
import { CHART_COLORS } from '../../utils/constants';

const EngagementChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Using mock data for demonstration
            const totalTweets = mockStats.overview.totalTweets;
            setData([
                { name: 'Likes', value: Math.round(mockStats.engagement.totalLikes / totalTweets) },
                { name: 'Retweets', value: Math.round(mockStats.engagement.totalRetweets / totalTweets) },
                { name: 'Replies', value: Math.round(mockStats.engagement.totalReplies / totalTweets) },
                { name: 'Quotes', value: Math.round(mockStats.engagement.totalQuotes / totalTweets) }
            ]);
        } catch (error) {
            console.error('Error fetching engagement stats:', error);
        }
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                />
                <Tooltip
                    contentStyle={{
                        background: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                />
                <Bar
                    dataKey="value"
                    fill={CHART_COLORS.secondary}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default EngagementChart;
