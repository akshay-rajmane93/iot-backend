const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(cors());

// Route to fetch temperature from ESP32
app.get('/temperature', async (req, res) => {
  try {
    const esp32_ip = 'http://192.168.87.200/temperature'; // Replace with your ESP32 local IP
    const response = await axios.get(esp32_ip);
    res.json(response.data); // Send the data received from ESP32 to the client
  } catch (error) {
    console.error('Error fetching temperature from ESP32:', error);
    res.status(500).json({ message: 'Failed to fetch temperature' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
