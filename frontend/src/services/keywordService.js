// Keyword API calls
import api from './api';

export const keywordService = {
    getKeywords: async () => {
        const response = await api.get('/keywords');
        return response.data;
    },

    addKeyword: async (keyword) => {
        const response = await api.post('/keywords', keyword);
        return response.data;
    },

    updateKeyword: async (id, keyword) => {
        const response = await api.put(`/keywords/${id}`, keyword);
        return response.data;
    },

    deleteKeyword: async (id) => {
        const response = await api.delete(`/keywords/${id}`);
        return response.data;
    }
};

