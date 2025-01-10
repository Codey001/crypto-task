import { Router } from 'express';
import { getStats, getDeviation } from '../controllers/cryptoController.js';

const router = Router();

//route for stats
router.get('/stats', getStats);
//route to get the deviation
router.get('/deviation', getDeviation);

export default router;
