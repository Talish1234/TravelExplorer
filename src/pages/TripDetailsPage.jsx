import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
import PricingBreakdown from "../components/PricingBreakdown";
import Footer from "../components/Footer";
import tripsData from "../data/trips.json";

import styles from "../styles/TripDetailsPage.module.css";

const TripDetailsPage = () => {
  // useParams hook from react-router-dom is used to access the trip ID from the URL
  // The trip state holds the details of the selected trip
  // The loading state indicates whether the trip details are currently being fetched
  // useEffect is used to fetch the trip details based on the trip ID
  // If the trip is not found, a message is displayed to the user
  // The trip details include the destination, rating, images, description, itinerary, and pricing information
  // The PricingBreakdown component is used to display the price details including base price, taxes, and discounts
  // The trip ID is extracted from the URL parameters using useParams
  // The component renders the trip details including title, rating, image gallery, overview, itinerary
  // and pricing section with a "Book Now" button
  
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
