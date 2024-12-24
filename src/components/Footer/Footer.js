import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    {/* Display the current year and app name */}
                    <p>
                        &copy; {new Date().getFullYear()} Your Crypto Market App
                    </p>
                    <p>All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
