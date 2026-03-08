// Custom statistics hook
import { useEffect, useState } from 'react';
import { statsService } from '../services/statsService';

export const useStats = () => {
    const [stats, setStats] = useState({
        overview: null,
        timeline: null,
        keywords: null,
        engagement: null,
        languages: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllStats();
    }, []);

    const fetchAllStats = async () => {
        try {
            setLoading(true);
            const [overview, timeline, keywords, engagement, languages] = await Promise.all([
                statsService.getOverview(),
                statsService.getTimeline(),
                statsService.getKeywordStats(),
                statsService.getEngagementStats(),
                statsService.getLanguageStats()
            ]);

            setStats({
                overview: overview.data,
                timeline: timeline.data,
                keywords: keywords.data,
                engagement: engagement.data,
                languages: languages.data
            });
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { stats, loading, error, refresh: fetchAllStats };
};

