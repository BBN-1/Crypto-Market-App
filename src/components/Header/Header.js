import React from "react";
import logo from "./logo.png";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";

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
