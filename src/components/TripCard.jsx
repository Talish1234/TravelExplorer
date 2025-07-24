import { Link } from 'react-router-dom';
import styles from '../styles/TripCard.module.css';

const TripCard = ({ trip }) => {
    // The TripCard component displays a single trip's details
    // It receives a trip object as a prop and renders its destination, price, duration, rating, and an image
    // The component uses Link from react-router-dom to navigate to the trip details page when clicked
    // The trip object should contain properties like id, destination, price, duration, rating, and images
    
    return (
        <Link to={`/trip/${trip.id}`} className={styles.tripCard}>
            <img src={trip.images[0]} alt={trip.destination} className={styles.tripImage} />
            <div className={styles.tripInfo}>
                <h3 className={styles.tripDestination}>{trip.destination}</h3>
                <p className={styles.tripPrice}>${trip.price} <span className={styles.perPerson}>/ person</span></p>
                <p className={styles.tripDuration}>{trip.duration}</p>
                <p className={styles.tripRating}>Rating: {trip.rating} / 5</p>
            </div>
        </Link>
    );
};

export default TripCard;