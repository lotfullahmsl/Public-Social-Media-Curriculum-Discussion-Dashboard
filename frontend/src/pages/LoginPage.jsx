// Login page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Demo login - bypass API for testing
            if (username === 'demo' && password === 'demo') {
                // Simulate successful login
                localStorage.setItem('token', 'demo-token-12345');
                localStorage.setItem('user', JSON.stringify({
                    username: 'demo',
                    full_name: 'Demo User',
                    role: 'teacher'
                }));
                window.location.href = '/';
                return;
            }

            // Try real API login
            const response = await login(username, password);
            if (response.success) {
                navigate('/');
            } else {
                setError(response.error || 'Login failed');
            }
        } catch (err) {
            setError('Invalid username or password. Try demo/demo for testing.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-left">
                    <div className="login-brand">
                        <div className="brand-icon">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h1>Social Media Dashboard</h1>
                        <p>Monitor university curriculum discussions in real-time</p>
                    </div>
                    <div className="login-features">
                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fas fa-chart-bar"></i>
                            </div>
                            <div>
                                <h3>Real-time Analytics</h3>
                                <p>Track discussions as they happen</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fas fa-comments"></i>
                            </div>
                            <div>
                                <h3>Sentiment Analysis</h3>
                                <p>Understand student feedback</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-icon">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <div>
                                <h3>Trending Topics</h3>
                                <p>Identify key discussion themes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-form-container">
                        <h2>Welcome Back</h2>
                        <p className="login-subtitle">Sign in to access your dashboard</p>

                        <div className="demo-info">
                            <i className="fas fa-info-circle"></i>
                            <span>Demo: username: <strong>demo</strong> / password: <strong>demo</strong></span>
                        </div>

                        {error && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-user"></i>
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <i className="fas fa-lock"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="login-button" disabled={loading}>
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
