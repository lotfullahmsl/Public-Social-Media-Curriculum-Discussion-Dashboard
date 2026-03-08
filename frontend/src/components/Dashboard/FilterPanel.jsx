// Filter panel component
import { useState } from 'react';
import { LANGUAGES, SORT_OPTIONS } from '../../utils/constants';
import './FilterPanel.css';

const FilterPanel = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        keyword: '',
        language: '',
        startDate: '',
        endDate: '',
        sort: 'created_at'
    });

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            keyword: '',
            language: '',
            startDate: '',
            endDate: '',
            sort: 'created_at'
        };
        setFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <div className="filter-title">
                    <i className="fas fa-filter"></i>
                    <h3>Filters</h3>
                </div>
                <button className="reset-button" onClick={handleReset}>
                    <i className="fas fa-times"></i>
                    Reset
                </button>
            </div>

            <div className="filter-content">
                <div className="filter-group">
                    <label>Search</label>
                    <div className="search-input">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search tweets..."
                            value={filters.keyword}
                            onChange={(e) => handleChange('keyword', e.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-group">
                    <label>Language</label>
                    <select
                        value={filters.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                    >
                        <option value="">All Languages</option>
                        {Object.entries(LANGUAGES).map(([code, name]) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label>End Date</label>
                    <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label>Sort By</label>
                    <select
                        value={filters.sort}
                        onChange={(e) => handleChange('sort', e.target.value)}
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
