import axios from 'axios';

const fetchCryptoData = async (coinId) => {
  try {
    const response = await axios.get(process.env.DATA_API, {
      params: {
        ids: coinId,
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    console.log(response.data[coinId])

    return response.data[coinId];
  } catch (error) {
    console.error(`Error fetching data for ${coinId}: ${error.message}`);
    throw error;
  }
};

export { fetchCryptoData };
