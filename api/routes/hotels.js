import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";

import Hotel from '../models/Hotel.js'

const router = express.Router();

// Create
router.post('/', createHotel)
// Update
router.put('/:id', updateHotel)
// Delete
router.delete('/:id', deleteHotel)
// Get one
router.get('/:id', getHotel)
// Get All
router.get('/', getAllHotels)

export default router