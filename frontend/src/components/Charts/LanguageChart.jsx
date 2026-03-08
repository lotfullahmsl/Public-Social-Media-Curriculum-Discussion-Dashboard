// Language distribution chart component
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { mockStats } from '../../data/mockData';
import { CHART_COLORS } from '../../utils/constants';

const LanguageChart = () => {
    const [data, setData] = useState([]);

    const COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.warning, CHART_COLORS.success];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Using mock data for demonstration
            setData(mockStats.languages.map(item => ({
                name: item.language,
                value: item.count
            })));
        } catch (error) {
            console.error('Error fetching language stats:', error);
        }
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        background: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default LanguageChart;
