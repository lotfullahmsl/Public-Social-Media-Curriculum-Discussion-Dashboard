import { useEffect, useState } from 'react';
import { userService } from '../services/userService';

export const useUsers = (filters = {}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await userService.getUsers(filters);
                setUsers(response.users || []);
                setTotalCount(response.total || 0);
            } catch (err) {
                setError(err.message || 'Failed to load users');
                console.error('Users fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [filters.query, filters.platform, filters.sortBy]);

    const searchUsers = async (query) => {
        try {
            setLoading(true);
            const response = await userService.searchUsers(query);
            setUsers(response.users || []);
            setTotalCount(response.total || 0);
        } catch (err) {
            setError(err.message || 'Failed to search users');
            console.error('User search error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getUserProfile = async (userId) => {
        try {
            return await userService.getUserProfile(userId);
        } catch (err) {
            console.error('Get user profile error:', err);
            throw err;
        }
    };

    const getUserConnections = async (userId) => {
        try {
            return await userService.getUserConnections(userId);
        } catch (err) {
            console.error('Get user connections error:', err);
            throw err;
        }
    };

    return {
        users,
        loading,
        error,
        totalCount,
        searchUsers,
        getUserProfile,
        getUserConnections
    };
};