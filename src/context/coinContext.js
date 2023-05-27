import { createContext, useState, useEffect } from "react"
import { getFirstTwelveCoinsByMarketCap } from "../services/cryptoData";

export const coinContext = createContext();

export const CoinProvider = ({children}) => {

    const [coinsData, setAllCoinsData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const coinsData = await getFirstTwelveCoinsByMarketCap();
            setAllCoinsData(coinsData.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);


return (<coinContext.Provider value={{coinsData, setAllCoinsData}}>{children} </coinContext.Provider>)
}