// Tweet feed component
import TweetCard from './TweetCard';

const TweetFeed = ({ tweets = [], loading = false }) => {
    if (loading) {
        return <div className="loading">Loading tweets...</div>;
    }

    if (tweets.length === 0) {
        return <div className="empty">No tweets found</div>;
    }

    return (
        <div className="tweet-feed">
            {tweets.map((tweet) => (
                <TweetCard key={tweet._id || tweet.tweet_id} tweet={tweet} />
            ))}
        </div>
    );
};

export default TweetFeed;
