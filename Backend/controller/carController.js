import Car from '../models/Car.js';

// GET /cars - Fetch all cars
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error: error.message });
    }
};

// POST /cars - Add new car
export const addCar = async (req, res) => {
    try {
        const { name, brand, image, pricePerDay, available } = req.body;
        
        // Company Requirement: Validation 
        if (!name || !brand || !image || !pricePerDay) {
            return res.status(400).json({ message: "Please provide all required car details" });
        }
        
        const newCar = await Car.create({ name, brand, image, pricePerDay, available });
        res.status(201).json({ message: "Car added successfully", car: newCar });
    } catch (error) {
        // Company Requirement: Proper API error handling
        res.status(500).json({ message: "Error adding car", error: error.message });
    }
};

// PUT /cars/:id - Update car
export const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ message: "Car updated successfully", car: updatedCar });
    } catch (error) {
        res.status(500).json({ message: "Error updating car", error: error.message });
    }
};

// DELETE /cars/:id - Delete car
export const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting car", error: error.message });
    }
};
