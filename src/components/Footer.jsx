import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} TravelExplorer. All rights reserved.</p>
            <div className={styles.socialLinks}>
                <a href="https://www.linkedin.com/in/mohd-talish-ansari-a8a05b234/" target="_blank">Linkend</a>
                <a href="https://leetcode.com/u/Talish1234/" target="_blank">LeetCode</a>
                <a href="https://github.com/Talish1234/TravelExplorer.git" target="_blank">Github</a>
            </div>
        </footer>
    );
};

export default Footer;