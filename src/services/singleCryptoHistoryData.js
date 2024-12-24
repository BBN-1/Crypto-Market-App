// Function to fetch historical data for a specific cryptocurrency from the CoinCap API and return the data array. The function takes the coinName as an argument and returns the data array from the response.

export const fetchCoinHistory = async (coinName) => {
    // Fetch the historical data from the CoinCap API
    const response = await fetch(
        `https://api.coincap.io/v2/assets/${coinName}/history?interval=d1`
    );
    // Check if the response is OK
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // return the 'data' array from the response
    return data.data;
};
