import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [destination, setDestination] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(destination);
    };

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
        </form>
    );
};

export default SearchBar;