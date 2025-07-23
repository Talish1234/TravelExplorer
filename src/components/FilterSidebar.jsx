import styles from '../styles/FilterSidebar.module.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
    const handleMinPriceChange = (e) => {
        onFilterChange({ minPrice: parseInt(e.target.value) });
    };

    const handleMaxPriceChange = (e) => {
        onFilterChange({ maxPrice: parseInt(e.target.value) });
    };

    const handleMinDurationChange = (e) => {
        onFilterChange({ minDuration: parseInt(e.target.value) });
    };

    const handleMaxDurationChange = (e) => {
        onFilterChange({ maxDuration: parseInt(e.target.value) });
    };

    const handleDestinationChange = (e) => {
        onFilterChange({ destination: e.target.value });
    };

    return (
        <div className={styles.filterSidebar}>
            <h3>Filters</h3>
            <div className={styles.filterGroup}>
                <label htmlFor="destinationFilter">Destination:</label>
                <input
                    id="destinationFilter"
                    type="text"
                    placeholder="e.g., Bali"
                    value={filters.destination}
                    onChange={handleDestinationChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <h4>Price Range:</h4>
                <div className={styles.rangeInput}>
                    <label>Min Price: ${filters.minPrice}</label>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={filters.minPrice}
                        onChange={handleMinPriceChange}
                    />
                </div>
                <div className={styles.rangeInput}>
                    <label>Max Price: ${filters.maxPrice}</label>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={filters.maxPrice}
                        onChange={handleMaxPriceChange}
                    />
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h4>Duration (Days):</h4>
                <div className={styles.rangeInput}>
                    <label>Min Days: {filters.minDuration}</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={filters.minDuration}
                        onChange={handleMinDurationChange}
                    />
                </div>
                <div className={styles.rangeInput}>
                    <label>Max Days: {filters.maxDuration}</label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={filters.maxDuration}
                        onChange={handleMaxDurationChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;