// Tweets page
import { useEffect, useState } from 'react';
import FilterPanel from '../components/Dashboard/FilterPanel';
import TweetCard from '../components/Dashboard/TweetCard';
import { mockTweets } from '../data/mockData';
import './TweetsPage.css';

const TweetsPage = () => {
    const [filters, setFilters] = useState({});
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTweets();
    }, [filters]);

    const fetchTweets = async () => {
        setLoading(true);
        // Using mock data for demonstration
        setTimeout(() => {
            setTweets(mockTweets);
            setLoading(false);
        }, 500);
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="tweets-page">
            <div className="page-header">
                <h1>All Tweets</h1>
                <p>Browse and filter collected tweets</p>
            </div>

            <div className="tweets-layout">
                <aside className="tweets-sidebar">
                    <FilterPanel onFilterChange={handleFilterChange} />
                </aside>

                <main className="tweets-main">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading tweets...</p>
                        </div>
                    ) : tweets.length > 0 ? (
                        <div className="tweets-grid">
                            {tweets.map((tweet) => (
                                <TweetCard key={tweet._id || tweet.tweet_id} tweet={tweet} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-comments" style={{ fontSize: '64px' }}></i>
                            <h3>No tweets found</h3>
                            <p>Try adjusting your filters</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TweetsPage;
