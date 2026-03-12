import './InformationFlow.css';

const InformationFlow = ({ data = {} }) => {
    const { nodes = [], links = [] } = data;

    const getFlowDirection = (link) => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        return { source: sourceNode, target: targetNode, value: link.value };
    };

    const totalFlow = links.reduce((sum, link) => sum + link.value, 0);

    return (
        <div className="information-flow">
            <div className="flow-header">
                <h2>Information Flow Analysis</h2>
                <p>Cross-platform information propagation and sharing patterns</p>
            </div>

            <div className="flow-visualization">
                <div className="platforms-container">
                    {nodes.map((node, index) => (
                        <div key={node.id} className="platform-node">
                            <div
                                className="node-circle"
                                style={{
                                    backgroundColor: node.color,
                                    width: `${Math.max(60, (node.value / 1000) + 40)}px`,
                                    height: `${Math.max(60, (node.value / 1000) + 40)}px`
                                }}
                            >
                                <i className={`fab fa-${node.name.toLowerCase()}`}></i>
                            </div>
                            <div className="node-info">
                                <h4>{node.name}</h4>
                                <span>{(node.value / 1000).toFixed(1)}K posts</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flow-connections">
                    {links.map((link, index) => {
                        const flow = getFlowDirection(link);
                        const percentage = ((link.value / totalFlow) * 100).toFixed(1);

                        return (
                            <div key={index} className="flow-connection">
                                <div className="connection-info">
                                    <div className="source-platform">
                                        <i className={`fab fa-${flow.source?.name.toLowerCase()}`}></i>
                                        <span>{flow.source?.name}</span>
                                    </div>

                                    <div className="flow-arrow">
                                        <i className="fas fa-arrow-right"></i>
                                        <div className="flow-stats">
                                            <span className="flow-value">{link.value}</span>
                                            <span className="flow-percentage">{percentage}%</span>
                                        </div>
                                    </div>

                                    <div className="target-platform">
                                        <i className={`fab fa-${flow.target?.name.toLowerCase()}`}></i>
                                        <span>{flow.target?.name}</span>
                                    </div>
                                </div>

                                <div className="flow-bar">
                                    <div
                                        className="flow-fill"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: flow.source?.color
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flow-metrics">
                <h3>Flow Metrics</h3>
                <div className="metrics-grid">
                    <div className="metric-card">
                        <i className="fas fa-exchange-alt"></i>
                        <div className="metric-content">
                            <span className="metric-value">{totalFlow.toLocaleString()}</span>
                            <span className="metric-label">Total Information Flow</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-share-alt"></i>
                        <div className="metric-content">
                            <span className="metric-value">{links.length}</span>
                            <span className="metric-label">Active Flow Channels</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-crown"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {nodes.reduce((max, node) => node.value > max.value ? node : max, nodes[0])?.name || 'N/A'}
                            </span>
                            <span className="metric-label">Dominant Platform</span>
                        </div>
                    </div>

                    <div className="metric-card">
                        <i className="fas fa-chart-line"></i>
                        <div className="metric-content">
                            <span className="metric-value">
                                {Math.max(...links.map(l => l.value)).toLocaleString()}
                            </span>
                            <span className="metric-label">Strongest Flow</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flow-insights">
                <h3>Flow Insights</h3>
                <div className="insights-list">
                    <div className="insight-item">
                        <i className="fas fa-lightbulb"></i>
                        <div className="insight-content">
                            <h4>Primary Flow Direction</h4>
                            <p>
                                {links.length > 0 &&
                                    `Most information flows from ${nodes.find(n => n.id === links.reduce((max, link) =>
                                        link.value > max.value ? link : max, links[0]).source)?.name
                                    } to other platforms`
                                }
                            </p>
                        </div>
                    </div>

                    <div className="insight-item">
                        <i className="fas fa-network-wired"></i>
                        <div className="insight-content">
                            <h4>Cross-Platform Connectivity</h4>
                            <p>
                                {nodes.length === 3 ? 'Full cross-platform connectivity established' :
                                    'Partial cross-platform connections detected'}
                            </p>
                        </div>
                    </div>

                    <div className="insight-item">
                        <i className="fas fa-balance-scale"></i>
                        <div className="insight-content">
                            <h4>Flow Balance</h4>
                            <p>
                                {links.length > 0 && Math.max(...links.map(l => l.value)) / Math.min(...links.map(l => l.value)) > 3
                                    ? 'Unbalanced flow - some platforms dominate information sharing'
                                    : 'Relatively balanced information flow across platforms'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationFlow;