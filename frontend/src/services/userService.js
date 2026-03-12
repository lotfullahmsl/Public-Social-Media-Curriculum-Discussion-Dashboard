
// Mock data for development - replace with real API calls
const mockUsers = [
    {
        id: 'user1',
        username: 'sarah_student',
        displayName: 'Sarah Ahmed',
        platforms: ['twitter', 'instagram'],
        influenceScore: 0.85,
        connectionsCount: 245,
        activityLevel: 'High',
        postsCount: 156,
        avgEngagement: 89,
        communityId: 'C1',
        profile: {
            bio: 'Computer Science student at University of Kurdistan',
            location: 'Erbil, Iraq',
            followers: 1200,
            following: 450,
            verified: false
        }
    },
    {
        id: 'user2',
        username: 'ahmed_prof',
        displayName: 'Dr. Ahmed Hassan',
        platforms: ['twitter', 'facebook'],
        influenceScore: 0.92,
        connectionsCount: 380,
        activityLevel: 'High',
        postsCount: 89,
        avgEngagement: 156,
        communityId: 'C2',
        profile: {
            bio: 'Professor of Computer Science',
            location: 'Sulaymaniyah, Iraq',
            followers: 2800,
            following: 180,
            verified: true
        }
    },
    {
        id: 'user3',
        username: 'student_council',
        displayName: 'Student Council',
        platforms: ['twitter', 'instagram', 'facebook'],
        influenceScore: 0.78,
        connectionsCount: 520,
        activityLevel: 'High',
        postsCount: 234,
        avgEngagement: 198,
        communityId: 'C1',
        profile: {
            bio: 'Official Student Council Account',
            location: 'Duhok, Iraq',
            followers: 3500,
            following: 120,
            verified: true
        }
    },
    {
        id: 'user4',
        username: 'tech_enthusiast',
        displayName: 'Kawan Rashid',
        platforms: ['instagram'],
        influenceScore: 0.65,
        connectionsCount: 180,
        activityLevel: 'Medium',
        postsCount: 78,
        avgEngagement: 67,
        communityId: 'C3',
        profile: {
            bio: 'Tech enthusiast and blogger',
            location: 'Baghdad, Iraq',
            followers: 890,
            following: 340,
            verified: false
        }
    },
    {
        id: 'user5',
        username: 'study_group_lead',
        displayName: 'Aya Mohammed',
        platforms: ['twitter'],
        influenceScore: 0.71,
        connectionsCount: 156,
        activityLevel: 'Medium',
        postsCount: 92,
        avgEngagement: 45,
        communityId: 'C1',
        profile: {
            bio: 'Study group coordinator',
            location: 'Kirkuk, Iraq',
            followers: 650,
            following: 280,
            verified: false
        }
    }
];

const mockUserConnections = {
    user1: {
        connections: [
            { id: 'user2', username: 'ahmed_prof', relationship: 'follows', strength: 0.8 },
            { id: 'user3', username: 'student_council', relationship: 'mutual', strength: 0.9 },
            { id: 'user5', username: 'study_group_lead', relationship: 'mutual', strength: 0.7 }
        ],
        networkMetrics: {
            degreeCentrality: 0.15,
            betweennessCentrality: 0.08,
            closenessCentrality: 0.22,
            clusteringCoefficient: 0.45
        }
    }
};

export const userService = {
    async getUsers(filters = {}) {
        try {
            // In production, replace with: const response = await api.get('/users', { params: filters });
            // return response.data;

            // Mock implementation with filtering
            await new Promise(resolve => setTimeout(resolve, 600));

            let filteredUsers = [...mockUsers];

            // Apply platform filter
            if (filters.platform && filters.platform !== 'all') {
                filteredUsers = filteredUsers.filter(user =>
                    user.platforms.includes(filters.platform)
                );
            }

            // Apply search query
            if (filters.query) {
                const query = filters.query.toLowerCase();
                filteredUsers = filteredUsers.filter(user =>
                    user.username.toLowerCase().includes(query) ||
                    user.displayName.toLowerCase().includes(query)
                );
            }

            // Apply sorting
            if (filters.sortBy) {
                filteredUsers.sort((a, b) => {
                    switch (filters.sortBy) {
                        case 'influence':
                            return b.influenceScore - a.influenceScore;
                        case 'connections':
                            return b.connectionsCount - a.connectionsCount;
                        case 'activity':
                            const activityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
                            return activityOrder[b.activityLevel] - activityOrder[a.activityLevel];
                        case 'centrality':
                            return b.influenceScore - a.influenceScore; // Using influence as proxy
                        default:
                            return 0;
                    }
                });
            }

            return {
                users: filteredUsers,
                total: filteredUsers.length
            };
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async searchUsers(query) {
        try {
            // In production, replace with: const response = await api.get('/users/search', { params: { q: query } });
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 400));

            const filteredUsers = mockUsers.filter(user =>
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.displayName.toLowerCase().includes(query.toLowerCase()) ||
                user.profile.bio.toLowerCase().includes(query.toLowerCase())
            );

            return {
                users: filteredUsers,
                total: filteredUsers.length
            };
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    },

    async getUserProfile(userId) {
        try {
            // In production, replace with: const response = await api.get(`/users/${userId}`);
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 300));

            const user = mockUsers.find(u => u.id === userId);
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    },

    async getUserConnections(userId) {
        try {
            // In production, replace with: const response = await api.get(`/users/${userId}/connections`);
            // return response.data;

            // Mock implementation
            await new Promise(resolve => setTimeout(resolve, 500));

            const connections = mockUserConnections[userId] || {
                connections: [],
                networkMetrics: {
                    degreeCentrality: 0,
                    betweennessCentrality: 0,
                    closenessCentrality: 0,
                    clusteringCoefficient: 0
                }
            };

            return connections;
        } catch (error) {
            console.error('Error fetching user connections:', error);
            throw error;
        }
    }
};