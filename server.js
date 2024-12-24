const express = require('express');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env

const app = express();
const port = 5000;

const thingSpeakReadAPIKey = process.env.THINGSPEAK_READ_API_KEY;
const channelID = process.env.THINGSPEAK_CHANNEL_ID;

app.get('/get-temperature', async (req, res) => {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${channelID}/fields/1.json?api_key=${thingSpeakReadAPIKey}&results=1`);
    const temperatureData = response.data.feeds[0].field1;  // Get the temperature
    res.json({ temperature: temperatureData });
  } catch (error) {
    console.error('Error fetching temperature from ThingSpeak:', error);
    res.status(500).json({ message: 'Failed to fetch temperature' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
