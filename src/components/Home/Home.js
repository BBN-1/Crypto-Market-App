import { getFirstTwelveCoinsByMarketCap } from "../../services/cryptoData";
import Coin from "../Coin/Coin";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
    const [allCoins, setAllCoins] = useState([]);
    const [sortBy, setSortBy] = useState("marketCapUsd");
    const [sortOrder, setSortOrder] = useState("desc");

    //initial API call of coins data
    useEffect(() => {
        const getApiData = async () => {
            try {
                const coinsData = await getFirstTwelveCoinsByMarketCap();
                setAllCoins(coinsData.data);

             
            } catch (error) {
                console.log(error);
            }
        };
        getApiData();

        //update of API data every 60 seconds
        const interval = setInterval(() => {
            getApiData();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

   

    const sortCoins = (key) => {
        if (sortBy === key) {
            // If the same key is clicked, toggle the sort order
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // If a new key is clicked, set it as the sort key and default to descending order
            setSortBy(key);
            setSortOrder("desc");
        }
    };

    // Function to sort coins based on the current sort criteria
    const sortCoinsData = () => {
        if (allCoins.length === 0) {
            return; // Return early if allCoins is empty
        }

        const sortedCoins = [...allCoins].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            // Special case for sorting the "name" field
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
        });
        setAllCoins(sortedCoins);
    };

    // Trigger sorting when sortBy or sortOrder changes
    useEffect(() => {
        sortCoinsData();
    }, [ sortBy, sortOrder]);

    const tableTotalStyle = {
        justifyContent: "flex-start",
    };

    return (
        <div className={styles["home-container"]}>
            <section className={styles["table"]}>
                <div className={`${styles["tr-th"]}`}>
                    <p className={`${styles["th-td"]} ${styles["coin-rank"]}`}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("rank")}
                        >
                            {" "}
                            #
                        </span>
                    </p>
                    <p className={styles["th-td"]}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("name")}
                        >
                            Name
                        </span>
                    </p>
                    <p className={`${styles["th-td"]} ${styles["coin-price"]}`}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("priceUsd")}
                        >
                            Price
                        </span>
                    </p>
                    <p className={`${styles["th-td"]} ${styles["coin-change-24hours"]}`}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("changePercent24Hr")}
                        >
                            24h %
                        </span>
                    </p>
                    <p className={`${styles["th-td"]} ${styles["th-td-responsive"]}`}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("marketCapUsd")}
                        >
                            Market Cap
                        </span>
                    </p>
                    <p className={`${styles["th-td"]} ${styles["th-td-responsive"]}`}>
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("volumeUsd24Hr")}
                        >
                            Volume 24h
                        </span>
                    </p>
                    <p className={`${styles["th-td"]} ${styles["th-td-responsive"]}`} style={tableTotalStyle} >
                        <span
                            className={styles["home-key-span"]}
                            onClick={() => sortCoins("supply")}
                        >
                            Circulating Supply
                        </span>
                    </p>
                </div>

                {allCoins.map((coin, index) => (
                    <Coin key={coin.id} coin={coin} index={index} />
                ))}
            </section>
        </div>
    );
};

export default Home;
