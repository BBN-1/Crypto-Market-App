import { getFirstTwelveCoinsByVolume } from "../../services/cryptoData";
import Coin from "../Coin/Coin";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

const Home = () => {
    const [allCoins, setAllCoins] = useState([]);

    useEffect(() => {
        getFirstTwelveCoinsByVolume()
            .then((res) => {
                setAllCoins(res.data);
            })
            .catch((error) => {
                //handle error here
                console.log(error);
            });
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
                    <p className={styles["th-td"]} style={tableTotalStyle}>Circulating Supply</p>
                </div>
                
                {allCoins.map((coin, index) => (
                    <Coin key={coin.id} coin={coin} index={index} />
                ))}
            </section>
        </div>
    );
};

export default Home;
