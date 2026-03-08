// Timeline chart component
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS } from '../../utils/constants';
import { formatChartDate } from '../../utils/dateFormatter';

const TimelineChart = ({ data = [] }) => {
    const chartData = data.map(item => ({
        date: formatChartDate(item.date || item._id),
        tweets: item.count || item.tweets || 0
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                    dataKey="date"
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
                <Line
                    type="monotone"
                    dataKey="tweets"
                    stroke={CHART_COLORS.primary}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.primary, r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TimelineChart;
