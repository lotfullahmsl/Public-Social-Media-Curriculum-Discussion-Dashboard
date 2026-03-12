// Main App component
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import { useAuth } from './hooks/useAuth';
import AnalyticsPage from './pages/AnalyticsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import DashboardPage from './pages/DashboardPage';
import InfluencersPage from './pages/InfluencersPage';
import KeywordsPage from './pages/KeywordsPage';
import LoginPage from './pages/LoginPage';
import NetworkPage from './pages/NetworkPage';
import StatisticsPage from './pages/StatisticsPage';
import TweetsPage from './pages/TweetsPage';
import UsersPage from './pages/UsersPage';

function App() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        );
    }

    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Header />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/network" element={<ProtectedRoute><NetworkPage /></ProtectedRoute>} />
                        <Route path="/communities" element={<ProtectedRoute><CommunitiesPage /></ProtectedRoute>} />
                        <Route path="/influencers" element={<ProtectedRoute><InfluencersPage /></ProtectedRoute>} />
                        <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
                        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                        <Route path="/tweets" element={<ProtectedRoute><TweetsPage /></ProtectedRoute>} />
                        <Route path="/statistics" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
                        <Route path="/keywords" element={<ProtectedRoute><KeywordsPage /></ProtectedRoute>} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
