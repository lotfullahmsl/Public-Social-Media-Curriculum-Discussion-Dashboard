// Sidebar component
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { path: '/', icon: 'fa-chart-line', label: 'Dashboard' },
        { path: '/tweets', icon: 'fa-comments', label: 'Tweets' },
        { path: '/statistics', icon: 'fa-chart-bar', label: 'Statistics' },
        { path: '/keywords', icon: 'fa-tags', label: 'Keywords' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <i className="fas fa-chart-line"></i>
                </div>
                <h2>Social Dashboard</h2>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <i className={`fas ${item.icon}`}></i>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-info">
                    <p className="info-label">System Status</p>
                    <div className="status-indicator">
                        <span className="status-dot"></span>
                        <span>Active</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
