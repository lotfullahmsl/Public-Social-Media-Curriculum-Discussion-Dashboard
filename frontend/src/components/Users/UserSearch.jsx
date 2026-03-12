import { useState } from 'react';
import './UserSearch.css';

const UserSearch = ({ onSearch, placeholder = "Search users..." }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        // Debounced search - search as user types
        if (value.length >= 2 || value.length === 0) {
            setTimeout(() => {
                if (query === value) { // Only search if query hasn't changed
                    onSearch(value);
                }
            }, 300);
        }
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <form className="user-search" onSubmit={handleSubmit}>
            <div className="search-input-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                {query && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="clear-button"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                )}
            </div>
        </form>
    );
};

export default UserSearch;