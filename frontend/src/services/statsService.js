// Statistics API calls
import api from './api';

export const statsService = {
    getOverview: async () => {
        const response = await api.get('/stats/overview');
        return response.data;
    },

    getTimeline: async (params = {}) => {
        const response = await api.get('/stats/timeline', { params });
        return response.data;
    },

    getKeywordStats: async () => {
        const response = await api.get('/stats/keywords');
        return response.data;
    },

    getEngagementStats: async () => {
        const response = await api.get('/stats/engagement');
        return response.data;
    },

    getLanguageStats: async () => {
        const response = await api.get('/stats/languages');
        return response.data;
    }
};

