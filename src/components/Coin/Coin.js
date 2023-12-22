import { useState, useEffect } from "react";
import styles from "./Coin.module.css";
import { Link } from "react-router-dom";
import { formatNumberWithColons } from "../../services/numberFormatting"
import {
    LineChart,
    Line,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
} from "recharts";
import { useMediaQuery } from "react-responsive";
import { fetchCoinHistory } from "../../services/singleCryptoHistoryData";



const Coin = ({ coin, index }) => {
    const [coinLogo, setCoinLogo] = useState("");
    const [coinHistory, setCoinHistory] = useState([]);
    const coinId = coin.id;

        //TO FORMAT THE PRICE!!
    // Fetch history data for the specific coin
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                console.log("coinId", coinId);
                const data = await fetchCoinHistory(coinId);

                setCoinHistory(data);
                console.log("coinHistory", coinHistory);
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };

        fetchHistory();
    }, [coin.name]);

    // Options for the chart
    const data = coinHistory.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        price: parseFloat(item.priceUsd),
    }));

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

       // Media query for mobile devices
       const isMobile = useMediaQuery({ query: "(max-width: 767px)" });



    return (
        <Link to={`/currencies/${coin.name}/${coin.id}`} className={styles["tr"]}>
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
                className={`${styles["td"]}  ${styles["coin-price"]} ${styles["align-right"]}`}
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
     

            <div className={`${styles["td"]}  ${styles["hide-on-mobile"]} ${styles["align-right"]}`}>
                <span> {formatNumberWithColons(coin.marketCapUsd)}</span>
            </div>
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["align-right"]}`}
            >
                <span>{formatNumberWithColons(coin.volumeUsd24Hr)}</span>
            </div>
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["tableTotalStyle"]} ${styles["align-right"]}`}
                
            >
                {" "}
                <span>
                    {formatNumberWithColons(coin.supply)} {coin.symbol}
                </span>
            </div>
            <div
                className={`${styles["td"]}  ${styles["table-total"]} ${styles["hide-on-mobile"]} ${styles["tableTotalStyle"]}`}
                
            >
                
                
                <ResponsiveContainer width="100%" height={53}>
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                           
                            
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#8884d8"
                                fill="#16c784"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                
            </div>
        </Link>
    );
};

export default Coin;
