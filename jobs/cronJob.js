import cron from 'node-cron';
import { fetchCryptoData } from '../services/cryptoService.js'; 
import Crypto from '../models/Crypto.js'; 
import log from '../utils/logger.js'; 

// Save data to the database
const saveCryptoData = async (coinId) => {
  try {
    const data = await fetchCryptoData(coinId);

    const newCrypto = new Crypto({
      coin: coinId,
      price: data.usd,
      marketCap: data.usd_market_cap,
      change24h: data.usd_24h_change,
    });

    await newCrypto.save();
    log(`Saved new data for ${coinId} at ${new Date().toISOString()}`);
  } catch (error) {
    log(`Error fetching or saving data for ${coinId}: ${error.message}`);
  }
};

// Schedule the job to run every 2 hours (*/2 * * * *)
cron.schedule('0 */2 * * *', async () => {
  log('Fetching updated cryptocurrency data...');

  // Fetch and store data for each of the coins
  await saveCryptoData('bitcoin');
  await saveCryptoData('matic-network');
  await saveCryptoData('ethereum');
});

log('Cron job started: fetching data every 2 hours');





