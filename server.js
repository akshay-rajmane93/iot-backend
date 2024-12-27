const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());

// ThingSpeak Configuration
const THINGSPEAK_CHANNEL_ID = process.env.THINGSPEAK_CHANNEL_ID; // Replace with your ThingSpeak Channel ID
const THINGSPEAK_API_KEY = process.env.THINGSPEAK_READ_API_KEY;       // Replace with your ThingSpeak Read API Key
const fetchUrl = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/fields/1.json?api_key=${THINGSPEAK_API_KEY}&results=1`;

// Route to fetch temperature from ThingSpeak
app.get('/temperature', async (req, res) => {
  try {
    const response = await axios.get(fetchUrl);
    const feeds = response.data.feeds;

    if (feeds && feeds.length > 0) {
      const latestTemperature = feeds[0].field1; // Fetch the latest temperature value
      res.json({ temperature: latestTemperature });
    } else {
      res.status(404).json({ message: 'No temperature data available' });
    }
  } catch (error) {
    console.error('Error fetching temperature from ThingSpeak:', error.message);
    res.status(500).json({ message: 'Failed to fetch temperature' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
