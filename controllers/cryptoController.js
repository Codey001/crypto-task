import Crypto from '../models/Crypto.js';
import { std } from 'mathjs'; 

const allowedCoinList = ['bitcoin', 'matic-network', 'ethereum'];

//get current latest stats of coin
export const getStats = async (req, res) => {
  const { coin } = req.body;

  if (!coin || !allowedCoinList.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin specified' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ date: -1 }).limit(1);
    if (!latestData) {
      return res.status(404).json({ error: 'No data found for this coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      change24h: latestData.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get standard deviation of the last 100 records for a coin
export const getDeviation = async (req, res) => {
  const { coin } = req.body;

  if (!coin || !allowedCoinList.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin specified' });
  }

  try {
    const records = await Crypto.find({ coin }).sort({ date: -1 }).limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: 'No data found for this coin' });
    }

    const prices = records.map(record => record.price);
    const deviation = std(prices);

    res.json({ deviation });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
