// Keyword list component
import './KeywordList.css';

const KeywordList = ({ keywords, onEdit, onDelete }) => {
    return (
        <div className="keyword-list">
            <table className="keyword-table">
                <thead>
                    <tr>
                        <th>Keyword</th>
                        <th>Language</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {keywords.map((keyword) => (
                        <tr key={keyword._id}>
                            <td className="keyword-cell">
                                <span className="keyword-badge">{keyword.keyword}</span>
                            </td>
                            <td>{keyword.language?.toUpperCase() || 'N/A'}</td>
                            <td>{keyword.category || 'General'}</td>
                            <td>
                                <span className={`status-badge ${keyword.active ? 'active' : 'inactive'}`}>
                                    {keyword.active ? (
                                        <><i className="fas fa-check"></i> Active</>
                                    ) : (
                                        <><i className="fas fa-times"></i> Inactive</>
                                    )}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => onEdit(keyword)}
                                        title="Edit"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => onDelete(keyword._id)}
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KeywordList;
