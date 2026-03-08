// Keyword form component
import { useEffect, useState } from 'react';
import { LANGUAGES } from '../../utils/constants';
import './KeywordForm.css';

const KeywordForm = ({ keyword, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        keyword: '',
        language: 'en',
        category: '',
        active: true
    });

    useEffect(() => {
        if (keyword) {
            setFormData({
                keyword: keyword.keyword || '',
                language: keyword.language || 'en',
                category: keyword.category || '',
                active: keyword.active !== undefined ? keyword.active : true
            });
        }
    }, [keyword]);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="keyword-form">
            <div className="form-header">
                <h2>{keyword ? 'Edit Keyword' : 'Add New Keyword'}</h2>
                <button className="close-btn" onClick={onCancel}>
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="keyword">Keyword *</label>
                    <input
                        type="text"
                        id="keyword"
                        value={formData.keyword}
                        onChange={(e) => handleChange('keyword', e.target.value)}
                        placeholder="e.g., exam, assignment"
                        required
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="language">Language *</label>
                    <select
                        id="language"
                        value={formData.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        required
                    >
                        {Object.entries(LANGUAGES).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        placeholder="e.g., assessment, content"
                    />
                </div>

                <div className="form-field checkbox-field">
                    <label>
                        <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => handleChange('active', e.target.checked)}
                        />
                        <span>Active (collect tweets with this keyword)</span>
                    </label>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        {keyword ? 'Update' : 'Add'} Keyword
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KeywordForm;
