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
            <div
                className={`${styles.td} ${flexTdStyle} ${styles["coin-place-row"]}`}
            >
                <span>{index + 1}</span>
            </div>
            <div
                className={`${styles["logo-and-name-wrapper"]} ${styles.td} ${tdStyle} ${styles["coin-container"]}`}
            >
                <img className={styles["coin-logo"]} src={coinLogo} alt="" />
                <div className={styles["coin-info"]}>
                    <p className={styles["coin-name"]}>{coin.name} </p>
                    <span className={styles["coin-symbol"]}>{coin.symbol}</span>
                </div>
            </div>

            <div className={`${styles.td} ${tdStyle} ${styles["coin-price"]}`}>
                <span>${Number(coin.priceUsd).toFixed(2)}</span>
            </div>
            <div
                className={`${styles.td} ${
                    Number(coin.changePercent24Hr) > 0
                        ? styles["positive-change"]
                        : styles["negative-change"]
                } ${styles["coin-change-24hours"]}`}
            >
                <span>{`${Number(coin.changePercent24Hr).toFixed(2)}`}</span>
            </div>

            <div className={`${styles.td} ${styles["hide-on-mobile"]}`}>
                <span> {Number(coin.marketCapUsd).toFixed(0)}</span>
            </div>
            <div
                className={`${styles.td} ${styles["table-total"]} ${styles["hide-on-mobile"]}`}
            >
                <span>{Number(coin.volumeUsd24Hr).toFixed(0)}</span>
            </div>
            <div
                className={`${styles.td} ${styles["table-total"]} ${styles["hide-on-mobile"]}`}
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
