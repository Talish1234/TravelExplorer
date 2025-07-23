import { Link } from 'react-router-dom';
import styles from '../styles/TripCard.module.css';

const TripCard = ({ trip }) => {
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