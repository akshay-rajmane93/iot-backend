const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// Replace with your ThingSpeak Read API Key and Channel ID
const thingSpeakReadAPIKey = 'PYLM6TN4B3HFDCON';
const channelID = '2794295';

app.get('/get-temperature', async (req, res) => {
  try {
    const response = await axios.get(`https://api.thingspeak.com/channels/${channelID}/fields/1.json?api_key=${thingSpeakReadAPIKey}&results=1`);
    const temperatureData = response.data.feeds[0].field1;  // Access the latest temperature data
    res.json({ temperature: temperatureData });
  } catch (error) {
    console.error('Error fetching temperature from ThingSpeak:', error);
    res.status(500).json({ message: 'Failed to fetch temperature' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
