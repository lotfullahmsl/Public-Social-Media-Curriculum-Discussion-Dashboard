// Keyword chart component
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockStats } from '../../data/mockData';
import { CHART_COLORS } from '../../utils/constants';

const KeywordChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Using mock data for demonstration
            setData(mockStats.keywords.slice(0, 5).map(item => ({
                keyword: item.keyword,
                count: item.count
            })));
        } catch (error) {
            console.error('Error fetching keyword stats:', error);
        }
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    type="number"
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                />
                <YAxis
                    type="category"
                    dataKey="keyword"
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                    width={80}
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
                    dataKey="count"
                    fill={CHART_COLORS.success}
                    radius={[0, 8, 8, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default KeywordChart;
