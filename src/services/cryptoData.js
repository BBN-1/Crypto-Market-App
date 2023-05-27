//fetching the first 12 crypto currencies by volume 

export const getFirstTwelveCoinsByMarketCap = async () => {
    const req = await fetch(`https://api.coincap.io/v2/assets?limit=12`);
    const res = await req.json();

    return res;
}