import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import PricingBreakdown from "../components/PricingBreakdown";
import Footer from "../components/Footer";
import tripsData from "../data/trips.json";

import styles from "../styles/TripDetailsPage.module.css";

const TripDetailsPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      const selectedTrip = tripsData.find((t) => t.id === parseInt(id));
      setTrip(selectedTrip);
      setLoading(false);
    }, 600);

    return () => clearTimeout(delay);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingSpinner}></div>
        <p>Fetching trip details...</p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className={styles.tripDetailsPage}>
        <Header />
        <main className={styles.tripContent}>
          <p className={styles.noTripFound}>
            Trip not found. Please go back to search.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const basePrice = parseInt(trip.price);
  const estimatedTaxes = basePrice * 0.08;
  const potentialDiscounts = basePrice > 1000 ? 50 : 0;

  return (
    <div className={`${styles.tripDetailsPage} ${styles.fadeIn}`}>
      <Header />
      <main className={styles.tripContent}>
        <h1 className={styles.tripTitle}>{trip.destination}</h1>
        <p className={styles.tripRating}>Rating: {trip.rating} / 5</p>

        <section className={styles.imageGallery}>
          <ImageCarousel images={trip.images} />
        </section>

        <section className={styles.tripOverview}>
          <h2>Overview</h2>
          <p>{trip.description}</p>
        </section>

        <section className={styles.tripItinerary}>
          <h2>Itinerary ({trip.duration})</h2>
          <ul className={styles.itineraryList}>
            {trip.itinerary.map((dayActivity, index) => (
              <li key={index}>{dayActivity}</li>
            ))}
          </ul>
        </section>

        <section className={styles.pricingSection}>
          <PricingBreakdown
            basePrice={basePrice}
            currency="$"
            taxes={estimatedTaxes}
            discounts={potentialDiscounts}
          />
          <button className={styles.bookNowButton}>Book Now</button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TripDetailsPage;
