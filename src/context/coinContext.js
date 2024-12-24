// Importing necessary hooks and services
import { createContext, useState, useEffect } from "react";
import { getFirstTwelveCoinsByMarketCap } from "../services/cryptoData";

// Create a context for the coin data
export const coinContext = createContext();

export const CoinProvider = ({ children }) => {
    // State to hold the coin data fetched from the API
    const [coinsData, setAllCoinsData] = useState([]);

    // useEffect to fetch the coin data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the first 12 coins by market cap
                const coinsData = await getFirstTwelveCoinsByMarketCap();
                // Set the fetched data to the state
                setAllCoinsData(coinsData.data);
            } catch (error) {
                // Log any errors that occur during the fetch
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
         // Provide the coin data and the setter function to the children components
        <coinContext.Provider value={{ coinsData, setAllCoinsData }}>
            {children}
        </coinContext.Provider>
    );
};
