import { useCallback, useEffect, useState } from 'react';
import graphService from '../services/graphService';

const useInfluencers = () => {
    const [influencers, setInfluencers] = useState([]);
    const [selectedInfluencer, setSelectedInfluencer] = useState(null);
    const [influencerDetails, setInfluencerDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        platform: '',
        community: '',
        limit: 50
    });

    // Fetch top influencers
    const fetchInfluencers = useCallback(async (currentFilters = filters) => {
        setLoading(true);
        setError(null);

        try {
            const response = await graphService.getInfluenceAnalysis(currentFilters);
            const data = response.data || response;

            // Extract influencers from response
            const influencersList = data.top_influencers || data || [];
            setInfluencers(influencersList);
        } catch (err) {
            setError(err.message || 'Failed to fetch influencers');
            console.error('Influencers fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Get detailed information about a specific influencer
    const getInfluencerDetails = useCallback(async (userId) => {
        if (!userId) return null;

        setLoading(true);
        try {
            // Get user connections
            const connectionsResponse = await graphService.getUserConnections(userId);
            const connections = connectionsResponse.data || connectionsResponse;

            // Find influencer in current list
            const influencer = influencers.find(inf => inf.id === userId || inf.user_id === userId);

            if (influencer) {
                const details = {
                    ...influencer,
                    connections,
                    connectionCount: connections.length,
                    // Calculate additional metrics
                    engagementRate: calculateEngagementRate(influencer),
                    reachScore: calculateReachScore(influencer, connections),
                    crossPlatformPresence: getCrossPlatformPresence(influencer)
                };

                setInfluencerDetails(details);
                return details;
            }
        } catch (err) {
            console.error('Influencer details fetch error:', err);
        } finally {
            setLoading(false);
        }

        return null;
    }, [influencers]);

    // Calculate engagement rate
    const calculateEngagementRate = useCallback((influencer) => {
        const followers = influencer.followers_count || 1;
        const avgEngagement = (influencer.avg_likes || 0) +
            (influencer.avg_retweets || 0) +
            (influencer.avg_replies || 0);
        return ((avgEngagement / followers) * 100).toFixed(2);
    }, []);

    // Calculate reach score
    const calculateReachScore = useCallback((influencer, connections) => {
        const baseScore = influencer.influence_score || 0;
        const connectionBonus = (connections.length / 100) * 0.1; // 10% bonus per 100 connections
        const followerBonus = Math.log10((influencer.followers_count || 1) / 100) * 0.1;

        return Math.min(baseScore + connectionBonus + followerBonus, 1).toFixed(3);
    }, []);

    // Get cross-platform presence
    const getCrossPlatformPresence = useCallback((influencer) => {
        const platforms = [];
        if (influencer.platform) platforms.push(influencer.platform);
        if (influencer.linked_accounts) {
            Object.entries(influencer.linked_accounts).forEach(([platform, account]) => {
                if (account && !platforms.includes(platform)) {
                    platforms.push(platform);
                }
            });
        }
        return platforms;
    }, []);

    // Select an influencer and fetch details
    const selectInfluencer = useCallback(async (userId) => {
        setSelectedInfluencer(userId);
        if (userId) {
            await getInfluencerDetails(userId);
        } else {
            setInfluencerDetails(null);
        }
    }, [getInfluencerDetails]);

    // Update filters and refetch
    const updateFilters = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        fetchInfluencers(updatedFilters);
    }, [filters, fetchInfluencers]);

    // Get influencer statistics
    const getInfluencerStats = useCallback(() => {
        if (!influencers.length) return {};

        const totalInfluencers = influencers.length;
        const avgInfluenceScore = influencers.reduce((sum, inf) =>
            sum + (inf.influence_score || 0), 0) / totalInfluencers;

        const platformDistribution = influencers.reduce((acc, inf) => {
            const platform = inf.platform || 'unknown';
            acc[platform] = (acc[platform] || 0) + 1;
            return acc;
        }, {});

        const topInfluencer = influencers[0]; // Assuming sorted by influence

        const avgFollowers = influencers.reduce((sum, inf) =>
            sum + (inf.followers_count || 0), 0) / totalInfluencers;

        return {
            totalInfluencers,
            averageInfluenceScore: avgInfluenceScore.toFixed(3),
            platformDistribution,
            topInfluencer,
            averageFollowers: Math.round(avgFollowers)
        };
    }, [influencers]);

    // Get top influencers by platform
    const getInfluencersByPlatform = useCallback(() => {
        const platformGroups = influencers.reduce((acc, influencer) => {
            const platform = influencer.platform || 'unknown';
            if (!acc[platform]) {
                acc[platform] = [];
            }
            acc[platform].push(influencer);
            return acc;
        }, {});

        // Sort each platform group by influence score
        Object.keys(platformGroups).forEach(platform => {
            platformGroups[platform].sort((a, b) =>
                (b.influence_score || 0) - (a.influence_score || 0)
            );
        });

        return platformGroups;
    }, [influencers]);

    // Get influence trends (mock for now)
    const getInfluenceTrends = useCallback(() => {
        // This would come from backend in real implementation
        return influencers.slice(0, 10).map((inf, index) => ({
            username: inf.username,
            current_score: inf.influence_score,
            previous_score: (inf.influence_score || 0) * (0.8 + Math.random() * 0.4),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            change: ((Math.random() - 0.5) * 0.2).toFixed(3)
        }));
    }, [influencers]);

    // Initial fetch
    useEffect(() => {
        fetchInfluencers();
    }, []);

    return {
        // Data
        influencers,
        selectedInfluencer,
        influencerDetails,
        loading,
        error,
        filters,

        // Actions
        fetchInfluencers,
        selectInfluencer,
        updateFilters,
        getInfluencerDetails,

        // Computed values
        influencerStats: getInfluencerStats(),
        influencersByPlatform: getInfluencersByPlatform(),
        influenceTrends: getInfluenceTrends()
    };
};

export default useInfluencers;