import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    }
    catch (err) {
        next(err);
    }
}
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hotel Deleted Successfully");
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        )
        res.status(200).json(hotel);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 }, }).limit(req.query.limit);
        res.status(200).json(hotels);
    }
    catch (err) {
        next(err);
    }
}
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    }
    catch (err) {
        next(err);
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });
        const campingCount = await Hotel.countDocuments({ type: "camping" });

        res.status(200).json([
            { type: "Hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "cabins", count: cabinCount },
            { type: "camping", count: campingCount },
        ]);
    }
    catch (err) {
        next(err);
    }
}