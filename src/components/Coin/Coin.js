import { useState, useEffect } from "react";
import styles from "./Coin.module.css";

const Coin = ({ coin, index }) => {
    const [coinLogo, setCoinLogo] = useState("");

    useEffect(() => {
        const fetchCoinLogo = async () => {
            try {
                const logo = await import(`../../coinLogos/${coin.name}.png`);
                const imageSrc = logo.default;
                setCoinLogo(imageSrc);
            } catch (error) {
                // Handle error if the image is not found
                console.log(`Error loading coin logo for ${coin.name}`);
            }
        };

        fetchCoinLogo();
    }, [coin.name]);

    const tableTotalStyle = {
        justifyContent: "flex-start",
    };

    const tdStyle = {
        justifyContent: "center",
    };

    const flexTdStyle = {
        flexGrow: 2,
    };

    return (
        <div className={styles.tr}>
            <div className={`${styles.td} ${flexTdStyle}`}>
                <span>{index + 1}</span>
            </div>
            <span
                className={`${styles["logo-and-name-wrapper"]} ${styles.td} ${tdStyle}`}
            >
                <img className={styles["coin-logo"]} src={coinLogo} alt="" />
                <p className={styles["coin-name"]}>
                    {coin.name}{" "}
                    <span className={styles["coin-symbol"]}>{coin.symbol}</span>
                </p>
            </span>

            <div className={`${styles.td} ${tdStyle}`}>
                <span>${Number(coin.priceUsd).toFixed(2)}</span>
            </div>
            <div
                className={`${styles.td} ${
                    Number(coin.changePercent24Hr) > 0
                        ? styles["positive-change"]
                        : styles["negative-change"]
                }`}
            >
                <span>{`${Number(coin.changePercent24Hr).toFixed(2)}`}</span>
            </div>

            <div className={`${styles.td}`}>
                <span> {Number(coin.marketCapUsd).toFixed(0)}</span>
            </div>
            <div className={`${styles.td} ${styles["table-total"]}`}>
                <span>{Number(coin.volumeUsd24Hr).toFixed(0)}</span>
            </div>
            <div
                className={`${styles.td} ${styles["table-total"]}`}
                style={tableTotalStyle}
            >
                {" "}
                <span>
                    {Number(coin.supply).toFixed(0)} {coin.symbol}
                </span>
            </div>
        </div>
    );
};

export default Coin;
