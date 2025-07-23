import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import TripDetailsPage from './pages/TripDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import styles from './styles/App.module.css';

function App() {
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