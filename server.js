import express from 'express';
import connectDB from './config/db.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import log from './utils/logger.js';

import './jobs/cronJob.js';

const app = express();
const port = process.env.PORT || 3000;

//connect to database
connectDB();

app.use(express.json()); 

// Routes
app.use('/api', cryptoRoutes);

// Start the server
app.listen(port, () => {
  log(`Server is running on port ${port}`);
});
