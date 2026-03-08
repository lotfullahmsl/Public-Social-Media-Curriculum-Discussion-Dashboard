// Custom tweets hook
import { useEffect, useState } from 'react';
import { tweetService } from '../services/tweetService';

export const useTweets = (initialParams = {}) => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        fetchTweets();
    }, [params]);

    const fetchTweets = async () => {
        try {
            setLoading(true);
            const response = await tweetService.getTweets(params);
            setTweets(response.data || []);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateParams = (newParams) => {
        setParams({ ...params, ...newParams });
    };

    const refresh = () => {
        fetchTweets();
    };

    return { tweets, loading, error, updateParams, refresh };
};

