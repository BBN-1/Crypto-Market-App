import { getFirstTwelveCoinsByVolume } from "../../services/cryptoData";
import Coin from "../Coin/Coin";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
    const [allCoins, setAllCoins] = useState([]);

    //initial API call of coins data
    useEffect(() => {
        const getApiData = async () => {
            try {
                const coinsData = await getFirstTwelveCoinsByVolume();
                setAllCoins(coinsData.data);
            } catch (error) {
                console.log(error);
            }
        };
        getApiData();


    //update of API data every 60 seconds 
        const interval = setInterval(() => {
            getApiData();
        }, 60000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const tableTotalStyle = {
        justifyContent: "flex-start",
    };

    return (
        <div className={styles["home-container"]}>
            <section className={styles["table"]}>
                <div className={`${styles["tr-th"]}`}>
                    <p className={styles["th-td"]}>#</p>
                    <p className={styles["th-td"]}>Name</p>
                    <p className={styles["th-td"]}>Price</p>
                    <p className={styles["th-td"]}>24h %</p>
                    <p className={styles["th-td"]}>Market Cap</p>
                    <p className={styles["th-td"]}>Volume 24h</p>
                    <p className={styles["th-td"]} style={tableTotalStyle}>
                        Circulating Supply
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
