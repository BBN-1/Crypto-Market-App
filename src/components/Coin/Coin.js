// Import necessary libraries and components
import { useState, useEffect } from "react";
import styles from "./Coin.module.css";
import { Link } from "react-router-dom";
import { formatNumberWithColons } from "../../services/numberFormatting";
import { AreaChart, CartesianGrid, ResponsiveContainer, Area } from "recharts";
import { useMediaQuery } from "react-responsive";
import { fetchCoinHistory } from "../../services/singleCryptoHistoryData";

// Coin component to display information about a specific cryptocurrency
const Coin = ({ coin, index }) => {
    // State to hold the logo image of the coin
    const [coinLogo, setCoinLogo] = useState("");

    // State to hold historical price data for the coin
    const [coinHistory, setCoinHistory] = useState([]);

    // Unique ID for the coin
    const coinId = coin.id;

    // Fetch historical price data for the coin whenever the coin's name changes
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await fetchCoinHistory(coinId);
                setCoinHistory(data);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };

        fetchHistory();
    }, [coin.name]);

    // Map historical data to a format suitable for the AreaChart
    const data = coinHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString(), // Format date for display
        price: parseFloat(item.priceUsd), // Convert price to a floating-point number
    }));

    // Dynamically fetch the logo of the coin based on its name
    useEffect(() => {
        const fetchCoinLogo = async () => {
            try {
                // Dynamically import the image file for the coin logo
                const logo = await import(`../../coinLogos/${coin.name}.png`);
                const imageSrc = logo.default;
                setCoinLogo(imageSrc);
            } catch (error) {
                // Fallback to default.png if the coin image is not found
                console.log(
                    `Error loading coin logo for ${coin.name}, using default image`
                );
                const defaultLogo = await import(`../../coinLogos/default.png`);
                setCoinLogo(defaultLogo.default);
            }
        };

        fetchCoinLogo();
    }, [coin.name]);

    // Detect if the user is on a mobile device using a media query
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    // JSX structure for displaying the coin details and chart
    return (
        <Link
            to={`/currencies/${coin.name}/${coin.id}`} // Link to detailed page for the coin
            className={styles["tr"]}
        >
            {/* Display coin's ranking */}
            <div
                className={`${styles["td"]} ${styles["flexTdStyle"]} ${styles["coin-place-row"]}`}
            >
                <span>{index + 1}</span>
            </div>

            {/* Display coin's logo and name */}
            <div
                className={`${styles["logo-and-name-wrapper"]} ${styles["td"]} $ ${styles["coin-container"]}`}
            >
                <img
                    className={styles["coin-logo"]}
                    src={coinLogo}
                    alt={coin.name} // Accessible alt text
                />
                <div className={styles["coin-info"]}>
                    <p className={styles["coin-name"]}>{coin.name}</p>
                    <span className={styles["coin-symbol"]}>{coin.symbol}</span>
                </div>
            </div>

            {/* Display current price */}
            <div
                className={`${styles["td"]}  ${styles["coin-price"]} ${styles["align-right"]}`}
            >
                <span>{formatNumberWithColons(coin.priceUsd)}</span>
            </div>

            {/* Display 24-hour percentage change */}
            <div
                className={`${styles["td"]}  ${
                    Number(coin.changePercent24Hr) > 0
                        ? styles["positive-change"] // Style for positive change
                        : styles["negative-change"] // Style for negative change
                } ${styles["coin-change-24hours"]} ${styles["align-right"]}`}
            >
                <span>{`${Number(coin.changePercent24Hr).toFixed(2)}`}</span>
            </div>

            {/* Display market capitalization */}
            <div
                className={`${styles["td"]}  ${styles["hide-on-mobile"]} ${styles["align-right"]}`}
            >
                <span> {formatNumberWithColons(coin.marketCapUsd)}</span>
            </div>

            {/* Display 24-hour trading volume */}
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["align-right"]}`}
            >
                <span>{formatNumberWithColons(coin.volumeUsd24Hr)}</span>
            </div>

            {/* Display circulating supply */}
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["tableTotalStyle"]} ${styles["align-right"]}`}
            >
                <span>
                    {formatNumberWithColons(coin.supply)} {coin.symbol}
                </span>
            </div>

            {/* Display historical price chart */}
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["tableTotalStyle"]}`}
            >
                <ResponsiveContainer width="100%" height={53}>
                    <AreaChart
                        data={data} // Historical price data
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />{" "}
                        {/* Grid lines */}
                        <Area
                            type="monotone" // Smooth line
                            dataKey="price" // Key to display on the chart
                            stroke="#8884d8" // Line color
                            fill="#16c784" // Area fill color
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Link>
    );
};

export default Coin;
