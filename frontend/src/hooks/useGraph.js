import { useCallback, useEffect, useState } from 'react';
import graphService from '../services/graphService';

const useGraph = (initialFilters = {}) => {
    const [graphData, setGraphData] = useState({
        nodes: [],
        links: [],
        communities: [],
        metrics: {}
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedCommunity, setSelectedCommunity] = useState(null);

    // Fetch network graph data
    const fetchGraphData = useCallback(async (currentFilters = filters) => {
        setLoading(true);
        setError(null);

        try {
            const response = await graphService.getNetworkGraph(currentFilters);
            const data = response.data || response; // Handle both mock and real API responses
            setGraphData(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch graph data');
            console.error('Graph data fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Fetch centrality metrics
    const fetchCentralityMetrics = useCallback(async () => {
        try {
            const response = await graphService.getCentralityMetrics();
            const metrics = response.data || response;
            setGraphData(prev => ({
                ...prev,
                metrics: { ...prev.metrics, centrality: metrics }
            }));
        } catch (err) {
            console.error('Centrality metrics fetch error:', err);
        }
    }, []);

    // Fetch communities
    const fetchCommunities = useCallback(async () => {
        try {
            const response = await graphService.getCommunities();
            const communities = response.data || response;
            setGraphData(prev => ({
                ...prev,
                communities
            }));
        } catch (err) {
            console.error('Communities fetch error:', err);
        }
    }, []);

    // Update filters and refetch data
    const updateFilters = useCallback((newFilters) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        fetchGraphData(updatedFilters);
    }, [filters, fetchGraphData]);

    // Trigger graph analysis
    const analyzeGraph = useCallback(async () => {
        setLoading(true);
        try {
            await graphService.analyzeGraph();
            // Refetch data after analysis
            await fetchGraphData();
        } catch (err) {
            setError(err.message || 'Failed to analyze graph');
        } finally {
            setLoading(false);
        }
    }, [fetchGraphData]);

    // Get user connections
    const getUserConnections = useCallback(async (userId) => {
        try {
            const response = await graphService.getUserConnections(userId);
            const connections = response.data || response;
            return connections;
        } catch (err) {
            console.error('User connections fetch error:', err);
            return [];
        }
    }, []);

    // Filter nodes by community
    const filterByCommunity = useCallback((communityId) => {
        setSelectedCommunity(communityId);
        if (communityId) {
            const filteredNodes = graphData.nodes.filter(node =>
                node.community === communityId
            );
            const nodeIds = new Set(filteredNodes.map(node => node.id));
            const filteredLinks = graphData.links.filter(link =>
                nodeIds.has(link.source) && nodeIds.has(link.target)
            );

            return {
                nodes: filteredNodes,
                links: filteredLinks
            };
        }
        return graphData;
    }, [graphData]);

    // Get top influencers
    const getTopInfluencers = useCallback((limit = 10) => {
        return graphData.nodes
            .filter(node => node.influence_score)
            .sort((a, b) => b.influence_score - a.influence_score)
            .slice(0, limit);
    }, [graphData.nodes]);

    // Initial data fetch
    useEffect(() => {
        fetchGraphData();
    }, []);

    return {
        // Data
        graphData,
        loading,
        error,
        filters,
        selectedNode,
        selectedCommunity,

        // Actions
        fetchGraphData,
        fetchCentralityMetrics,
        fetchCommunities,
        updateFilters,
        analyzeGraph,
        getUserConnections,
        filterByCommunity,
        getTopInfluencers,
        setSelectedNode,
        setSelectedCommunity,

        // Computed values
        nodeCount: graphData.nodes.length,
        linkCount: graphData.links.length,
        communityCount: graphData.communities.length
    };
};

export default useGraph;