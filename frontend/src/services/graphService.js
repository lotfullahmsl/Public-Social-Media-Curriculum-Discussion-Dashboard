import { mockGraphData } from '../data/mockData';
import api from './api';

const graphService = {
    // Get network graph data
    getNetworkGraph: async (filters = {}) => {
        try {
            // For development, use mock data
            if (process.env.NODE_ENV === 'development') {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Apply basic filtering to mock data
                let filteredData = { ...mockGraphData };

                if (filters.platform) {
                    filteredData.nodes = filteredData.nodes.filter(node =>
                        node.platform === filters.platform
                    );
                    const nodeIds = new Set(filteredData.nodes.map(node => node.id));
                    filteredData.links = filteredData.links.filter(link =>
                        nodeIds.has(link.source) && nodeIds.has(link.target)
                    );
                }

                return { success: true, data: filteredData };
            }

            // Production API call
            const response = await api.get('/api/graph/network', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error fetching network graph:', error);
            throw error;
        }
    },

    // Get centrality metrics
    getCentralityMetrics: async () => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                return {
                    success: true,
                    data: {
                        degree: mockGraphData.nodes.reduce((acc, node) => {
                            acc[node.id] = node.connections / 50; // Normalize
                            return acc;
                        }, {}),
                        betweenness: mockGraphData.nodes.reduce((acc, node) => {
                            acc[node.id] = Math.random() * 0.5; // Mock betweenness
                            return acc;
                        }, {}),
                        closeness: mockGraphData.nodes.reduce((acc, node) => {
                            acc[node.id] = Math.random() * 0.8; // Mock closeness
                            return acc;
                        }, {})
                    }
                };
            }

            const response = await api.get('/api/graph/centrality');
            return response.data;
        } catch (error) {
            console.error('Error fetching centrality metrics:', error);
            throw error;
        }
    },

    // Get communities
    getCommunities: async () => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                return { success: true, data: mockGraphData.communities };
            }

            const response = await api.get('/api/graph/communities');
            return response.data;
        } catch (error) {
            console.error('Error fetching communities:', error);
            throw error;
        }
    },

    // Get influence analysis
    getInfluenceAnalysis: async () => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                const influencers = mockGraphData.nodes
                    .sort((a, b) => b.influence_score - a.influence_score)
                    .slice(0, 10);
                return { success: true, data: { top_influencers: influencers } };
            }

            const response = await api.get('/api/graph/influence');
            return response.data;
        } catch (error) {
            console.error('Error fetching influence analysis:', error);
            throw error;
        }
    },

    // Trigger graph analysis
    analyzeGraph: async () => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 2000));
                return { success: true, message: 'Graph analysis completed' };
            }

            const response = await api.post('/api/graph/analyze');
            return response.data;
        } catch (error) {
            console.error('Error triggering graph analysis:', error);
            throw error;
        }
    },

    // Get user connections
    getUserConnections: async (userId) => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 300));

                // Find connections for the user in mock data
                const userConnections = mockGraphData.links
                    .filter(link => link.source === userId || link.target === userId)
                    .map(link => {
                        const connectedUserId = link.source === userId ? link.target : link.source;
                        const connectedUser = mockGraphData.nodes.find(node => node.id === connectedUserId);
                        return {
                            id: connectedUserId,
                            username: connectedUser?.username || connectedUserId,
                            relationship_type: link.type,
                            weight: link.weight,
                            platform: link.platform
                        };
                    });

                return { success: true, data: userConnections };
            }

            const response = await api.get(`/api/users/${userId}/connections`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user connections:', error);
            throw error;
        }
    },

    // Get information flow
    getInformationFlow: async (filters = {}) => {
        try {
            if (process.env.NODE_ENV === 'development') {
                await new Promise(resolve => setTimeout(resolve, 500));
                return {
                    success: true,
                    data: {
                        flow_paths: mockGraphData.links,
                        influence_chains: []
                    }
                };
            }

            const response = await api.get('/api/graph/flow', { params: filters });
            return response.data;
        } catch (error) {
            console.error('Error fetching information flow:', error);
            throw error;
        }
    }
};

export default graphService;