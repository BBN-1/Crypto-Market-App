import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";

const Header = () => {
    return (
        <header className={styles['header']}>
            <div className={styles['logo']}>
                <img src={logo} alt="Logo" className={styles['logoImage']} />
            </div>
            <nav className={styles['navbar']}>
                <ul className={styles['navbarList']}>
                    <li className={styles['navbarItem']}>
                        <a href="#home" className={styles['navbarLink']}>
                            Home
                        </a>
                    </li>
                    <li className={styles['navbarItem']}>
                        <a href="#about" className={styles['navbarLink']}>
                            About
                        </a>
                    </li>
                    <li className={styles['navbarItem']}>
                        <a href="#services" className={styles['navbarLink']}>
                            Services
                        </a>
                    </li>
                    <li className={styles['navbarItem']}>
                        <a href="#contact" className={styles['navbarLink']}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
