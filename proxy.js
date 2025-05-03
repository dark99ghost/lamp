const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { state } = req.query;
    if (!state || !['on', 'off'].includes(state)) {
      return res.status(400).json({ error: 'Invalid or missing state parameter' });
    }

    const espResponse = await axios.get(`http://192.168.1.2/led?state=${state}`, {
      timeout: 5000 // Add 5-second timeout
    });
    
    res.status(200).json({ success: true, message: espResponse.data });
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ success: false, error: `Failed to connect to ESP8266: ${error.message}` });
  }
};
