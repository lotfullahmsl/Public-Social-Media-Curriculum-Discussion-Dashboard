// Header component
import { useAuth } from '../../hooks/useAuth';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="page-title">Dashboard</h1>
            </div>

            <div className="header-right">
                <button className="icon-button">
                    <i className="fas fa-bell"></i>
                    <span className="notification-badge">3</span>
                </button>

                <div className="user-menu">
                    <div className="user-avatar">
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="user-info">
                        <p className="user-name">{user?.full_name || user?.username || 'User'}</p>
                        <p className="user-role">{user?.role || 'Teacher'}</p>
                    </div>
                    <button className="logout-button" onClick={handleLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
