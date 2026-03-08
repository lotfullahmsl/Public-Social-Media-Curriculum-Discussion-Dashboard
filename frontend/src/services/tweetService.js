// Tweet API calls
import api from './api';

export const tweetService = {
    getTweets: async (params = {}) => {
        const response = await api.get('/tweets', { params });
        return response.data;
    },

    getTweetById: async (id) => {
        const response = await api.get(`/tweets/${id}`);
        return response.data;
    },

    searchTweets: async (query, params = {}) => {
        const response = await api.get('/tweets/search', {
            params: { q: query, ...params }
        });
        return response.data;
    },

    getRecentTweets: async (limit = 10) => {
        const response = await api.get('/tweets/recent', {
            params: { limit }
        });
        return response.data;
    }
};

