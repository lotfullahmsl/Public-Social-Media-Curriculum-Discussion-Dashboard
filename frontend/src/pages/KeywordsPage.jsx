// Keywords management page
import { useEffect, useState } from 'react';
import KeywordForm from '../components/Keywords/KeywordForm';
import KeywordList from '../components/Keywords/KeywordList';
import { mockKeywords } from '../data/mockData';
import './KeywordsPage.css';

const KeywordsPage = () => {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingKeyword, setEditingKeyword] = useState(null);

    useEffect(() => {
        fetchKeywords();
    }, []);

    const fetchKeywords = async () => {
        try {
            setLoading(true);
            // Using mock data for demonstration
            setTimeout(() => {
                setKeywords(mockKeywords);
                setLoading(false);
            }, 500);
        } catch (error) {
            console.error('Error fetching keywords:', error);
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setEditingKeyword(null);
        setShowForm(true);
    };

    const handleEdit = (keyword) => {
        setEditingKeyword(keyword);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this keyword?')) {
            try {
                // Mock delete - just remove from state
                setKeywords(keywords.filter(k => k._id !== id));
            } catch (error) {
                console.error('Error deleting keyword:', error);
                alert('Failed to delete keyword');
            }
        }
    };

    const handleFormSubmit = async (keywordData) => {
        try {
            if (editingKeyword) {
                // Mock update
                setKeywords(keywords.map(k =>
                    k._id === editingKeyword._id ? { ...k, ...keywordData } : k
                ));
            } else {
                // Mock add
                const newKeyword = {
                    _id: Date.now().toString(),
                    ...keywordData,
                    added_by: 'admin',
                    created_at: new Date().toISOString()
                };
                setKeywords([...keywords, newKeyword]);
            }
            setShowForm(false);
            setEditingKeyword(null);
        } catch (error) {
            console.error('Error saving keyword:', error);
            alert('Failed to save keyword');
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setEditingKeyword(null);
    };

    return (
        <div className="keywords-page">
            <div className="page-header">
                <div>
                    <h1>Keyword Management</h1>
                    <p>Manage keywords for tweet collection</p>
                </div>
                <button className="add-button" onClick={handleAdd}>
                    <i className="fas fa-plus"></i>
                    Add Keyword
                </button>
            </div>

            {showForm && (
                <div className="form-modal">
                    <div className="form-modal-content">
                        <KeywordForm
                            keyword={editingKeyword}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading keywords...</p>
                </div>
            ) : keywords.length > 0 ? (
                <KeywordList
                    keywords={keywords}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ) : (
                <div className="empty-state">
                    <i className="fas fa-tags" style={{ fontSize: '64px' }}></i>
                    <h3>No keywords yet</h3>
                    <p>Add keywords to start collecting tweets</p>
                    <button className="add-button" onClick={handleAdd}>
                        <i className="fas fa-plus"></i>
                        Add Your First Keyword
                    </button>
                </div>
            )}
        </div>
    );
};

export default KeywordsPage;
