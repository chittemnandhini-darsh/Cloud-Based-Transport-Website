const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let bookings = [];

// Home API
app.get("/", (req, res) => {
    res.send("Cloud Based Transport Website Backend is Running!");
});

// Get transport services
app.get("/api/services", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Bus Transport",
            description: "Comfortable passenger transportation",
            price: 500
        },
        {
            id: 2,
            name: "Truck Transport",
            description: "Goods and cargo transportation",
            price: 1500
        },
        {
            id: 3,
            name: "Van Transport",
            description: "Small group and parcel transportation",
            price: 800
        }
    ]);
});

// Create booking
app.post("/api/bookings", (req, res) => {

    const {
        name,
        phone,
        service,
        pickup,
        destination,
        date
    } = req.body;

    if (!name || !phone || !service || !pickup || !destination || !date) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const booking = {
        id: bookings.length + 1,
        name,
        phone,
        service,
        pickup,
        destination,
        date,
        status: "Confirmed"
    };

    bookings.push(booking);

    res.status(201).json({
        message: "Booking successful!",
        booking: booking
    });
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
    res.json(bookings);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});