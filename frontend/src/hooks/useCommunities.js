import { useCallback, useEffect, useState } from 'react';
import graphService from '../services/graphService';

const useCommunities = () => {
    const [communities, setCommunities] = useState([]);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [communityDetails, setCommunityDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all communities
    const fetchCommunities = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await graphService.getCommunities();
            const data = response.data || response;
            setCommunities(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch communities');
            console.error('Communities fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Get community details with members
    const getCommunityDetails = useCallback(async (communityId) => {
        if (!communityId) return null;

        setLoading(true);
        try {
            // Get network graph data filtered by community
            const graphResponse = await graphService.getNetworkGraph({ community: communityId });
            const graphData = graphResponse.data || graphResponse;

            // Find community info
            const community = communities.find(c => c.id === communityId);

            if (community && graphData) {
                const details = {
                    ...community,
                    graph: graphData,
                    memberDetails: graphData.nodes || []
                };

                setCommunityDetails(details);
                return details;
            }
        } catch (err) {
            console.error('Community details fetch error:', err);
        } finally {
            setLoading(false);
        }

        return null;
    }, [communities]);

    // Select a community and fetch its details
    const selectCommunity = useCallback(async (communityId) => {
        setSelectedCommunity(communityId);
        if (communityId) {
            await getCommunityDetails(communityId);
        } else {
            setCommunityDetails(null);
        }
    }, [getCommunityDetails]);

    // Get community statistics
    const getCommunityStats = useCallback(() => {
        if (!communities.length) return {};

        const totalMembers = communities.reduce((sum, c) => sum + (c.size || 0), 0);
        const avgSize = totalMembers / communities.length;
        const largestCommunity = communities.reduce((max, c) =>
            (c.size || 0) > (max.size || 0) ? c : max, communities[0]);
        const avgDensity = communities.reduce((sum, c) => sum + (c.density || 0), 0) / communities.length;

        return {
            totalCommunities: communities.length,
            totalMembers,
            averageSize: Math.round(avgSize),
            largestCommunity,
            averageDensity: avgDensity.toFixed(2)
        };
    }, [communities]);

    // Get communities by platform
    const getCommunitiesByPlatform = useCallback(() => {
        const platformGroups = communities.reduce((acc, community) => {
            const platform = community.primary_platform || 'unknown';
            if (!acc[platform]) {
                acc[platform] = [];
            }
            acc[platform].push(community);
            return acc;
        }, {});

        return platformGroups;
    }, [communities]);

    // Initial fetch
    useEffect(() => {
        fetchCommunities();
    }, [fetchCommunities]);

    return {
        // Data
        communities,
        selectedCommunity,
        communityDetails,
        loading,
        error,

        // Actions
        fetchCommunities,
        selectCommunity,
        getCommunityDetails,

        // Computed values
        communityStats: getCommunityStats(),
        communitiesByPlatform: getCommunitiesByPlatform()
    };
};

export default useCommunities;