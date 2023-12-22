

export const fetchCoinHistory = async (coinName) => {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coinName}/history?interval=d1`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // return the 'data' array from the response
}

