import styles from '../styles/PricingBreakdown.module.css';

const PricingBreakdown = ({ basePrice, currency, taxes = 0, discounts = 0 }) => {
    const total = basePrice + taxes - discounts;

    return (
        <div className={styles.pricingBreakdown}>
            <h3>Price Details</h3>
            <div className={styles.priceRow}>
                <span>Base Price:</span>
                <span>{currency}{basePrice.toFixed(2)}</span>
            </div>
            {taxes > 0 && (
                <div className={styles.priceRow}>
                    <span>Estimated Taxes:</span>
                    <span>{currency}{taxes.toFixed(2)}</span>
                </div>
            )}
            {discounts > 0 && (
                <div className={`${styles.priceRow} ${styles.discount}`}>
                    <span>Discounts:</span>
                    <span>-{currency}{discounts.toFixed(2)}</span>
                </div>
            )}
            <div className={styles.totalPriceRow}>
                <span>Total Price:</span>
                <span>{currency}{total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default PricingBreakdown;