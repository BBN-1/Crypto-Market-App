import { useState, useEffect } from "react";
import styles from "./Coin.module.css";
import { Link } from "react-router-dom";
import { formatNumberWithColons } from "../../services/numberFormatting"



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



    return (
        <Link to={`/currencies/${coin.name}`} className={styles["tr"]}>
            <div
                className={`${styles["td"]} ${styles["flexTdStyle"]} ${styles["coin-place-row"]}`}
            >
                <span>{index + 1}</span>
            </div>
            <div
                className={`${styles["logo-and-name-wrapper"]} ${styles["td"]} $ ${styles["coin-container"]}`}
            >
                <img className={styles["coin-logo"]} src={coinLogo} alt="" />
                <div className={styles["coin-info"]}>
                    <p className={styles["coin-name"]}>{coin.name} </p>
                    <span className={styles["coin-symbol"]}>{coin.symbol}</span>
                </div>
            </div>

            <div
                className={`${styles["td"]}  ${styles["coin-price"]}`}
            >
                <span>{formatNumberWithColons(coin.priceUsd)}</span>
            </div>
            <div
                className={`${styles["td"]}  ${
                    Number(coin.changePercent24Hr) > 0
                        ? styles["positive-change"]
                        : styles["negative-change"]
                } ${styles["coin-change-24hours"]} ${styles["align-right"]}`}
            >
                <span>{`${Number(coin.changePercent24Hr).toFixed(2)}`}</span>
            </div>

            <div className={`${styles["td"]}  ${styles["hide-on-mobile"]}`}>
                <span> {formatNumberWithColons(coin.marketCapUsd)}</span>
            </div>
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]}`}
            >
                <span>{formatNumberWithColons(coin.volumeUsd24Hr)}</span>
            </div>
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["tableTotalStyle"]}`}
                
            >
                {" "}
                <span>
                    {formatNumberWithColons(coin.supply)} {coin.symbol}
                </span>
            </div>
        </Link>
    );
};

export default Coin;
