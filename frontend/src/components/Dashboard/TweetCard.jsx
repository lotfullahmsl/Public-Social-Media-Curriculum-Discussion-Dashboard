// Individual tweet card component
import { formatTimeAgo } from '../../utils/dateFormatter';
import './TweetCard.css';

const TweetCard = ({ tweet }) => {
    const {
        text,
        author_username,
        author_name,
        created_at,
        engagement = {},
        language,
        keywords_matched = []
    } = tweet;

    return (
        <div className="tweet-card">
            <div className="tweet-header">
                <div className="tweet-author">
                    <div className="author-avatar">
                        {author_name?.charAt(0) || 'U'}
                    </div>
                    <div className="author-info">
                        <p className="author-name">{author_name || 'Unknown'}</p>
                        <p className="author-username">@{author_username || 'unknown'}</p>
                    </div>
                </div>
                <div className="tweet-meta">
                    <span className="tweet-time">{formatTimeAgo(created_at)}</span>
                    {language && <span className="tweet-lang">{language.toUpperCase()}</span>}
                </div>
            </div>

            <div className="tweet-content">
                <p>{text}</p>
            </div>

            {keywords_matched && keywords_matched.length > 0 && (
                <div className="tweet-keywords">
                    {keywords_matched.map((keyword, index) => (
                        <span key={index} className="keyword-tag">{keyword}</span>
                    ))}
                </div>
            )}

            <div className="tweet-footer">
                <div className="engagement-stats">
                    <div className="stat">
                        <i className="far fa-heart"></i>
                        <span>{engagement.likes || 0}</span>
                    </div>
                    <div className="stat">
                        <i className="fas fa-retweet"></i>
                        <span>{engagement.retweets || 0}</span>
                    </div>
                    <div className="stat">
                        <i className="far fa-comment"></i>
                        <span>{engagement.replies || 0}</span>
                    </div>
                </div>
                <button className="view-tweet-button" title="View on Twitter">
                    <i className="fas fa-external-link-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default TweetCard;
