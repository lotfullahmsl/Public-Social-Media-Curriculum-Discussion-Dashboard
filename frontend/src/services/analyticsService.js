
// Mock data for development - replace with real API calls
const mockPlatformData = [
    {
        name: 'Twitter',
        posts_count: 45000,
        users_count: 8500,
        avg_engagement: 156,
        color: '#1da1f2'
    },
    {
        name: 'Instagram',
        posts_count: 28000,
        users_count: 5200,
        avg_engagement: 234,
        color: '#e4405f'
    },
    {
        name: 'Facebook',
        posts_count: 18000,
        users_count: 3800,
        avg_engagement: 89,
        color: '#4267b2'
    }
];

const mockTemporalData = {
    timeline: [
        { date: '2024-01-01', posts: 1200, users: 450, engagement: 2800 },
        { date: '2024-01-02', posts: 1350, users: 520, engagement: 3200 },
        { date: '2024-01-03', posts: 1100, users: 480, engagement: 2600 },
        { date: '2024-01-04', posts: 1450, users: 580, engagement: 3800 },
        { date: '2024-01-05', posts: 1600, users: 620, engagement: 4200 }
    ],
    peakHours: ['14:00', '15:00', '16:00', '20:00', '21:00'],
    weeklyPattern: {
        Monday: 0.8,
        Tuesday: 0.9,
        Wednesday: 1.2,
        Thursday: 1.1,
        Friday: 0.7,
        Saturday: 0.6,
        Sunday: 0.5
    }
};

const mockFlowData = {
    nodes: [
        { id: 'twitter', name: 'Twitter', value: 45000, color: '#1da1f2' },
        { id: 'instagram', name: 'Instagram', value: 28000, color: '#e4405f' },
        { id: 'facebook', name: 'Facebook', value: 18000, color: '#4267b2' }
    ],
    links: [
        { source: 'twitter', target: 'instagram', value: 1200 },
        { source: 'twitter', target: 'facebook', value: 800 },
        { source: 'instagram', target: 'twitter', value: 950 },
        { source: 'instagram', target: 'facebook', value: 600 },
        { source: 'facebook', target: 'twitter', value: 400 },
        { source: 'facebook', target: 'instagram', value: 350 }
    ]
};

const mockTrendsData = {
    topics: [
        { name: 'University Exams', count: 2400, growth: 15.2 },
        { name: 'Assignment Deadline', count: 1800, growth: 8.7 },
        { name: 'Course Registration', count: 1600, growth: 12.3 },
        { name: 'Graduation Requirements', count: 1200, growth: 5.1 },
        { name: 'Study Groups', count: 950, growth: 18.9 }
    ],
    viralThreshold: 150,
    peakHours: '2-4 PM',
    activePlatform: 'Twitter'
};

const mockSummaryData = {
    totalPosts: 91000,
    totalUsers: 17500,
    totalInteractions: 1250000,
    lastUpdated: '2 minutes ago'
};

export const analyticsService = {
    async getPlatformComparison() {
        try {
            // In production, replace with: const response = await api.get('/analytics/platforms');
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 800));
            return mockPlatformData;
        } catch (error) {
            console.error('Error fetching platform comparison:', error);
            throw error;
        }
    },

    async getTemporalAnalysis() {
        try {
            // In production, replace with: const response = await api.get('/analytics/temporal');
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 600));
            return mockTemporalData;
        } catch (error) {
            console.error('Error fetching temporal analysis:', error);
            throw error;
        }
    },

    async getInformationFlow() {
        try {
            // In production, replace with: const response = await api.get('/analytics/flow');
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 700));
            return mockFlowData;
        } catch (error) {
            console.error('Error fetching information flow:', error);
            throw error;
        }
    },

    async getTrends() {
        try {
            // In production, replace with: const response = await api.get('/analytics/trends');
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockTrendsData;
        } catch (error) {
            console.error('Error fetching trends:', error);
            throw error;
        }
    },

    async getSummary() {
        try {
            // In production, replace with: const response = await api.get('/analytics/summary');
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 300));
            return mockSummaryData;
        } catch (error) {
            console.error('Error fetching summary:', error);
            throw error;
        }
    }
};