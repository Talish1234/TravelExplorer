import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TripDetailsPage from './pages/TripDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from './styles/App.module.css';

function App() {
    // The App component sets up the main routing for the application
    // It uses React Router to define routes for the home page, search results, trip details and a not found page for any unmatched routes
    // The HomePage component is displayed at the root path "/"
    // The SearchResultsPage component is displayed at the "/search" path
    // The TripDetailsPage component is displayed at the "/trip/:id" path, where :id is a dynamic segment for trip IDs
    // The NotFoundPage component is displayed for any unmatched routes
    return (
        <Router>
            <div className={styles.app}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/trip/:id" element={<TripDetailsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;