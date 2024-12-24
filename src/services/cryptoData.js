// Function to fetch the first 12 cryptocurrencies by market cap from the CoinCap API

export const getFirstTwelveCoinsByMarketCap = async () => {
    // Fetch the data from the CoinCap API with a limit of 12
    const req = await fetch(`https://api.coincap.io/v2/assets?limit=12`);

    // Parse the JSON response
    const res = await req.json();

    // Return the data array from the response
    return res;
}