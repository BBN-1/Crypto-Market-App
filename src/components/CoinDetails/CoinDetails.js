import styles from "./CoinDetails.module.css";
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirstTwelveCoinsByMarketCap } from "../../services/cryptoData";
import { formatNumberWithColons } from "../../services/numberFormatting";
import { fetchCoinHistory } from "../../services/singleCryptoHistoryData";
import { CiStar, CiShare2 } from "react-icons/ci";

const CoinDetails = () => {
    const [coinData, setCoinData] = useState({});
    const { coinName, coinId } = useParams();
    const [coinLogo, setCoinLogo] = useState("");
    const [coinHistory, setCoinHistory] = useState([]);

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

    // Fetch history data for the specific coin
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
    }, [coinName]);

    // Map the historical data to a format suitable for the AreaChart
    const data = coinHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        price: parseFloat(item.priceUsd),
    }));

    //Load coin logo img
    useEffect(() => {
        const fetchCoinLogo = async () => {
            try {
                const logo = await import(`../../coinLogos/${coinName}.png`);
                const imageSrc = logo.default;
                setCoinLogo(imageSrc);
            } catch (error) {
                console.log(
                    `Error loading coin logo for ${coinName}, using default image`
                );
                // Fallback to default.png if the coin image is not found
                const defaultLogo = await import(`../../coinLogos/default.png`);
                setCoinLogo(defaultLogo.default);
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

    // Media query for mobile devices
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    // Custom tick for the X-axis
    const CustomTick = ({ x, y, payload }) => {
        const date = new Date(payload.value);
        const formattedDate = isMobile
            ? date.toLocaleDateString("default", { month: "short" })
            : date.toLocaleDateString();
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="middle"
                    fill="#666"
                    style={{ fontSize: isMobile ? "10px" : "14px" }}
                >
                    {formattedDate}
                </text>
            </g>
        );
    };

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

                <div className={styles["coin-details-candles-container"]}>
                    <p className={styles["candles-header-text"]}>
                        {coinData.name} to USD Chart
                    </p>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={<CustomTick />} />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#8884d8"
                                fill="#16c784"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <section className={styles["coin-statistics-container"]}>
                    <p className={styles["statistics-header-text"]}>
                        {coinData.name} statistics
                    </p>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Market cap</p>
                        <p className={styles["statistics-text"]}>
                            ${formatNumberWithColons(coinData.marketCapUsd)}
                        </p>
                    </div>
                    <div className={styles["statistics-item-wrapper"]}>
                        <p>Volume (24h)</p>
                        <p className={styles["statistics-text"]}>
                            ${formatNumberWithColons(coinData.volumeUsd24Hr)}
                        </p>
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
