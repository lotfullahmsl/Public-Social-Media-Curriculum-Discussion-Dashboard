import { useEffect, useState } from 'react';
import { analyticsService } from '../services/analyticsService';

export const useAnalytics = (type = 'all') => {
    const [analyticsData, setAnalyticsData] = useState({
        platforms: [],
        temporal: {},
        flow: {},
        trends: {},
        summary: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch different types of analytics data
                const [platformData, temporalData, flowData, trendsData, summaryData] = await Promise.all([
                    analyticsService.getPlatformComparison(),
                    analyticsService.getTemporalAnalysis(),
                    analyticsService.getInformationFlow(),
                    analyticsService.getTrends(),
                    analyticsService.getSummary()
                ]);

                setAnalyticsData({
                    platforms: platformData,
                    temporal: temporalData,
                    flow: flowData,
                    trends: trendsData,
                    summary: summaryData
                });
            } catch (err) {
                setError(err.message || 'Failed to load analytics data');
                console.error('Analytics fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [type]);

    const refreshAnalytics = async () => {
        await fetchAnalytics();
    };

    return {
        analyticsData,
        loading,
        error,
        refreshAnalytics
    };
};