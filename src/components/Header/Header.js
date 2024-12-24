// Import necessary libraries and components
import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";

const Header = () => {
    // State to manage the mobile menu open/close status
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        setMenuOpen(false);
    };

    // Function to toggle the mobile menu open/close status
    const toggleHamburgerMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // useEffect to toggle the "mobile-nav-active" class on the body element based on the menu's open/close status
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }
    }, [menuOpen]);

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["logo"]}>
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            className={styles["logoImage"]}
                        />
                    </Link>
                </div>

                <nav className={styles["navbar"]}>
                    <ul className={styles["navbarList"]}>
                        <li className={styles["navbarItem"]}>
                            <a href="#about" className={styles["navbarLink"]}>
                                About
                            </a>
                        </li>
                        <li className={styles["navbarItem"]}>
                            <a
                                href="#services"
                                className={styles["navbarLink"]}
                            >
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
                        className={styles["header-menu-btn"]}
                        onClick={toggleHamburgerMenu}
                    >
                        <IoMenuOutline />
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
        </>
    );
};

export default Header;
