import { useState } from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    // State to manage the search input value
    // The onSearch prop will be called with the destination when the form is submitted
    const [destination, setDestination] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(destination);
    };
    // The handleSubmit function prevents the default form submission behavior and calls the onSearch prop with the current destination value
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