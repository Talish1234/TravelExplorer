import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import TripCard from "../components/TripCard";
import FilterSidebar from "../components/FilterSidebar";
import Footer from "../components/Footer";
import tripsData from "../data/trips.json";

import styles from "../styles/SearchResultsPage.module.css";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    destination: searchParams.get("destination") || "",
    minPrice: 0,
    maxPrice: 2000,
    minDuration: 1,
    maxDuration: 10,
  });

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      let results = tripsData;

      if (filters.destination) {
        results = results.filter((trip) =>
          trip.destination
            .toLowerCase()
            .includes(filters.destination.toLowerCase())
        );
      }

      results = results.filter((trip) => {
        const price = parseInt(trip.price);
        return price >= filters.minPrice && price <= filters.maxPrice;
      });

      results = results.filter((trip) => {
        const durationMatch = trip.duration.match(/\d+/);
        const durationNum = durationMatch ? parseInt(durationMatch[0]) : 0;
        return (
          durationNum >= filters.minDuration &&
          durationNum <= filters.maxDuration
        );
      });

      setFilteredTrips(results);
      setLoading(false);
    }, 800);

    return () => clearTimeout(delay);
  }, [filters, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className={styles.searchResultsPage}>
      <Header />
      <div className={styles.contentWrapper}>
        <aside className={styles.filterSidebarContainer}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className={styles.tripGridContainer}>
          {loading ? (
            <div className={styles.loadingSpinnerContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading trips...</p>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className={`${styles.tripGrid} ${styles.fadeIn}`}>
              {filteredTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          ) : (
            <p className={styles.noResults}>
              No trips found matching your criteria.
            </p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
