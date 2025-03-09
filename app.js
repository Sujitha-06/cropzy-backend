require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY; // API key from .env file

// Define the /insights route
app.get("/insights", async (req, res) => {
    const { location, crop } = req.query; // Extract location and crop from query parameters
    console.log(`Received request for location: ${location}, crop: ${crop}`); // Debug log

    try {
        // Fetch weather data from Weatherstack API
        const weatherResponse = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: location,
            },
        });

        const weatherData = weatherResponse.data; // Store the API response

        // Check for any errors in the response
        if (weatherData.error) {
            return res.status(400).json({ error: weatherData.error.info });
        }

        // Prepare the response data
        const responseData = {
            weather: weatherData.current.weather_descriptions[0], // Current weather description
            temperature: weatherData.current.temperature, // Current temperature
            location: weatherData.location.name, // Location name
            cropInsight: `Recommended inputs for ${crop} in ${location}.`, // Sample crop insight
        };

        // Send the response as JSON
        res.json(responseData);
    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error fetching weather data:", error); // Log the error
        res.status(500).json({ error: "Failed to fetch weather data." }); // Respond with a 500 error
    }
});

// Root Route to Fix "Cannot GET /" Error
app.get("/", (req, res) => {
    res.send("Cropzy Backend is Running 🚀");
});

// Start the server
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log the server running message
});
