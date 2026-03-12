import { useCallback, useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import './NetworkGraph.css';

const NetworkGraph = ({
    graphData,
    onNodeClick,
    onLinkClick,
    selectedNode,
    selectedCommunity,
    width = 1200,
    height = 800
}) => {
    const fgRef = useRef();
    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [hoverNode, setHoverNode] = useState(null);

    // Community colors
    const communityColors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
        '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
        '#10ac84', '#ee5a24', '#0abde3', '#3867d6', '#8854d0'
    ];

    const getCommunityColor = (communityId) => {
        if (!communityId) return '#999999';
        const index = parseInt(communityId) % communityColors.length;
        return communityColors[index];
    };

    // Node styling
    const getNodeColor = useCallback((node) => {
        if (selectedCommunity && node.community !== selectedCommunity) {
            return 'rgba(153, 153, 153, 0.3)'; // Fade non-selected communities
        }
        if (highlightNodes.has(node.id)) {
            return '#ff6b6b'; // Highlight color
        }
        return getCommunityColor(node.community);
    }, [highlightNodes, selectedCommunity]);

    const getNodeSize = useCallback((node) => {
        const baseSize = 4;
        const maxSize = 20;
        const influenceMultiplier = (node.influence_score || 0) * 15;
        return Math.min(baseSize + influenceMultiplier, maxSize);
    }, []);

    // Link styling
    const getLinkColor = useCallback((link) => {
        if (highlightLinks.has(link)) {
            return 'rgba(255, 107, 107, 0.8)';
        }
        if (selectedCommunity) {
            const sourceNode = graphData.nodes.find(n => n.id === link.source.id || n.id === link.source);
            const targetNode = graphData.nodes.find(n => n.id === link.target.id || n.id === link.target);
            if (sourceNode?.community === selectedCommunity && targetNode?.community === selectedCommunity) {
                return 'rgba(255, 255, 255, 0.6)';
            }
            return 'rgba(255, 255, 255, 0.1)';
        }
        return 'rgba(255, 255, 255, 0.2)';
    }, [highlightLinks, selectedCommunity, graphData.nodes]);

    const getLinkWidth = useCallback((link) => {
        const baseWidth = 1;
        const maxWidth = 5;
        const weight = link.weight || 1;
        return Math.min(baseWidth + weight, maxWidth);
    }, []);

    // Node hover effects
    const handleNodeHover = useCallback((node) => {
        setHoverNode(node);

        if (node) {
            // Highlight connected nodes and links
            const connectedNodes = new Set([node.id]);
            const connectedLinks = new Set();

            graphData.links.forEach(link => {
                const sourceId = link.source.id || link.source;
                const targetId = link.target.id || link.target;

                if (sourceId === node.id) {
                    connectedNodes.add(targetId);
                    connectedLinks.add(link);
                } else if (targetId === node.id) {
                    connectedNodes.add(sourceId);
                    connectedLinks.add(link);
                }
            });

            setHighlightNodes(connectedNodes);
            setHighlightLinks(connectedLinks);
        } else {
            setHighlightNodes(new Set());
            setHighlightLinks(new Set());
        }
    }, [graphData.links]);

    // Node click handler
    const handleNodeClick = useCallback((node, event) => {
        if (onNodeClick) {
            onNodeClick(node, event);
        }

        // Center on clicked node
        if (fgRef.current) {
            fgRef.current.centerAt(node.x, node.y, 1000);
            fgRef.current.zoom(2, 1000);
        }
    }, [onNodeClick]);

    // Link click handler
    const handleLinkClick = useCallback((link, event) => {
        if (onLinkClick) {
            onLinkClick(link, event);
        }
    }, [onLinkClick]);

    // Node label
    const getNodeLabel = useCallback((node) => {
        return `
      <div class="node-tooltip">
        <strong>${node.username || node.id}</strong><br/>
        <span>Community: ${node.community || 'None'}</span><br/>
        <span>Influence: ${(node.influence_score || 0).toFixed(2)}</span><br/>
        <span>Connections: ${node.connections || 0}</span><br/>
        <span>Platform: ${node.platform || 'Unknown'}</span>
      </div>
    `;
    }, []);

    // Auto-fit graph on data change
    useEffect(() => {
        if (fgRef.current && graphData.nodes.length > 0) {
            fgRef.current.zoomToFit(400, 50);
        }
    }, [graphData]);

    return (
        <div className="network-graph-container">
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                width={width}
                height={height}

                // Node configuration
                nodeId="id"
                nodeLabel={getNodeLabel}
                nodeColor={getNodeColor}
                nodeRelSize={getNodeSize}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    // Custom node rendering for better performance
                    const size = getNodeSize(node);
                    const color = getNodeColor(node);

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false);
                    ctx.fillStyle = color;
                    ctx.fill();

                    // Add border for selected node
                    if (selectedNode && selectedNode.id === node.id) {
                        ctx.strokeStyle = '#ffffff';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    // Add username label for large nodes
                    if (size > 8 && globalScale > 1) {
                        ctx.fillStyle = '#ffffff';
                        ctx.font = `${Math.min(size / 2, 12)}px Arial`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(node.username || node.id, node.x, node.y);
                    }
                }}

                // Link configuration
                linkColor={getLinkColor}
                linkWidth={getLinkWidth}
                linkDirectionalArrowLength={3}
                linkDirectionalArrowRelPos={1}
                linkCurvature={0.1}

                // Interaction handlers
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                onLinkClick={handleLinkClick}

                // Force simulation
                d3AlphaDecay={0.02}
                d3VelocityDecay={0.3}
                cooldownTicks={100}

                // Background
                backgroundColor="#1a1a1a"

                // Performance
                enableNodeDrag={true}
                enableZoomInteraction={true}
                enablePanInteraction={true}
            />

            {/* Hover info panel */}
            {hoverNode && (
                <div className="hover-info">
                    <h4>{hoverNode.username || hoverNode.id}</h4>
                    <p>Community: {hoverNode.community || 'None'}</p>
                    <p>Influence: {(hoverNode.influence_score || 0).toFixed(2)}</p>
                    <p>Platform: {hoverNode.platform || 'Unknown'}</p>
                </div>
            )}
        </div>
    );
};

export default NetworkGraph;