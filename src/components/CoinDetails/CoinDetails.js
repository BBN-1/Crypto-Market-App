import styles from "./CoinDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirstTwelveCoinsByMarketCap } from "../../services/cryptoData";
import { formatNumberWithColons } from "../../services/numberFormatting";
import { CiStar, CiShare2 } from "react-icons/ci";

const CoinDetails = () => {
    const [coinData, setCoinData] = useState({});
    const { coinName } = useParams();
    const [coinLogo, setCoinLogo] = useState("");

    // Function to fetch the latest data for the specific coin
    const fetchLatestData = async () => {
        try {
            // Use the provided service to get the latest data for the specific coin
            const response = await getFirstTwelveCoinsByMarketCap();
            const latestData = response.data.find(
                (coin) => coin.name === coinName
            );

            // Update the coinData state with the latest data
            setCoinData(latestData);
        } catch (error) {
            console.error("Error fetching latest data:", error);
        }
    };

    // Initial fetch when the component mounts
    useEffect(() => {
        fetchLatestData();
    }, [coinName]);

    //Load coin logo img
    useEffect(() => {
        const fetchCoinLogo = async () => {
            try {
                const logo = await import(`../../coinLogos/${coinName}.png`);
                const imageSrc = logo.default;
                setCoinLogo(imageSrc);
            } catch (error) {
                // Handle error if the image is not found
                console.log(`Error loading coin logo for ${coinName}`);
            }
        };

        fetchCoinLogo();
    }, [coinName]);

    // Periodically fetch the latest data every 20 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchLatestData();
        }, 20000);

        // Cleanup: Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [coinName]);

    console.log(typeof coinData.priceUsd);

    return (
        <div className={styles["coin-details-container"]}>
            <div className={styles["coin-details-card"]}>
                <header className={styles["coin-details-card-header"]}>
                    <div className={styles["card-header-top"]}>
                        <div
                            className={
                                styles["header-icon-and-price-container"]
                            }
                        >
                            <img
                                src={coinLogo}
                                alt="coin_logo"
                                className={styles["coin-logo"]}
                            />
                            <p className={styles["coin-name"]}>
                                {coinData.name} price
                            </p>
                            <p className={styles["coin-symbol"]}>
                                {coinData.symbol}
                            </p>
                        </div>

                        <div className={styles["header-icons-container"]}>
                            <div className={styles["star-icon"]}>
                                <CiStar />
                            </div>
                            <div className={styles["share-icon"]}>
                                <CiShare2 />
                            </div>
                        </div>
                    </div>
                    <div className={styles["card-header-bottom"]}>
                        <p className={styles["coin-price"]}>
                            ${formatNumberWithColons(coinData.priceUsd)}
                        </p>
                        <p className={styles["coin-percentage-change"]}>
                            {formatNumberWithColons(coinData.changePercent24Hr)}
                            % (1d)
                        </p>
                    </div>
                </header>

                <section className={styles["coin-statistics-container"]}>
                    <p className={styles["statistics-header-text"]}>{coinData.name} statistics</p>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Market cap</p>
                        <p className={styles["statistics-text"]}>${formatNumberWithColons(coinData.marketCapUsd)}</p>
                    </div>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Volume (24h)</p>
                        <p className={styles["statistics-text"]}>${formatNumberWithColons(coinData.volumeUsd24Hr)}</p>
                    </div>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Circulating supply</p>
                        <p className={styles["statistics-text"]}>
                            {formatNumberWithColons(coinData.supply)}{" "}
                            {coinData.symbol}
                        </p>
                    </div>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Max. supply</p>
                        <p className={styles["statistics-text"]}>
                            {formatNumberWithColons(coinData.maxSupply)
                                ? formatNumberWithColons(coinData.maxSupply)
                                : "∞"}{" "}
                            {coinData.symbol}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CoinDetails;
