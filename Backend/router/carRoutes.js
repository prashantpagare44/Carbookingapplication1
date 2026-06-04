import express from 'express'
import { getCars, addCar, updateCar, deleteCar } from '../controller/carController.js';

const router = express.Router();

router.get('/cars', getCars);
router.post('/cars', addCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;