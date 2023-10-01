import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setMenuOpen(false);
    };

    const toggleHamburgerMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }
    }, [menuOpen]);

    return (
        <header className={styles["header"]}>
            <div className={styles["logo"]}>
                <img src={logo} alt="Logo" className={styles["logoImage"]} />
            </div>
            <nav className={styles["navbar"]}>
                <ul className={styles["navbarList"]}>
                    <li className={styles["navbarItem"]}>
                        <a href="#home" className={styles["navbarLink"]}>
                            Home
                        </a>
                    </li>
                    <li className={styles["navbarItem"]}>
                        <a href="#about" className={styles["navbarLink"]}>
                            About
                        </a>
                    </li>
                    <li className={styles["navbarItem"]}>
                        <a href="#services" className={styles["navbarLink"]}>
                            Services
                        </a>
                    </li>
                    <li className={styles["navbarItem"]}>
                        <a href="#contact" className={styles["navbarLink"]}>
                            Contact
                        </a>
                    </li>
                </ul>
                <button
                    onClick={toggleHamburgerMenu}
                    className={`${styles["header-hamburger"]} ${
                        menuOpen ? styles["is-active"] : ""
                    }`}
                >
                    <div className={styles["hamburger-bar"]}></div>
                </button>
            </nav>

            <nav
                className={`${styles["mobile-nav"]} ${
                    menuOpen ? styles["is-active"] : ""
                }`}
            >
                <Link to="/" onClick={closeMobileMenu}>
                    About
                </Link>
                <Link to="/" onClick={closeMobileMenu}>
                    Services
                </Link>
                <Link to="/" onClick={closeMobileMenu}>
                    Contact
                </Link>
            </nav>
        </header>
    );
};

export default Header;
