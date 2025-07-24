import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import TripCard from "../components/TripCard";
import tripsData from "../data/trips.json";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  // useNavigate hook from react-router-dom is used to programmatically navigate to the search results page
  // The featuredTrips state holds the trips to be displayed in the featured section
  // useEffect is used to initialize the featured trips from the tripsData
  // The handleSearch function constructs a query string based on the search input and navigates to
  // the search results page with the appropriate query parameters
  // The HomePage component renders a hero section with a background image, a title, a subtitle, and a search bar
  // It also displays a section for featured destinations with a carousel and trip cards for each featured trip
  // The Header and Footer components are included for consistent layout across the application
  // The featured trips are sliced from the tripsData to show only a limited number of trips in the featured section

  const navigate = useNavigate();
  const [featuredTrips, setFeaturedTrips] = useState([]);

  useEffect(() => {
    setFeaturedTrips(tripsData.slice(0, 5));
  }, []);

  const handleSearch = (destination) => {
    const queryParams = new URLSearchParams();
    if (destination) queryParams.append("destination", destination);
    navigate(`/search?${queryParams.toString()}`);
  };
  return (
    <div className={styles.homePage}>
      <Header />
      <section
        className={styles.heroSection}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
        <h1 className={styles.heroTitle}>Find Your Next Adventure</h1>
        <p className={styles.heroSubtitle}>
          Explore breathtaking destinations and create unforgettable memories.
        </p>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className={styles.featuredDestinations}>
        <h2>Featured Destinations</h2>
        {featuredTrips.length > 0 && (
          <div className={styles.carouselContainer}>
            <ImageCarousel
              images={featuredTrips.map((trip) => trip.images[0])}
            />
          </div>
        )}
        <div className={styles.destinationCardsGrid}>
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
