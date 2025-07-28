const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Ganti SERVER_DOMAIN dengan API tujuan (misal: https://clayza.biz.id atau API tujuan asli)
const SERVER_DOMAIN = 'https://fred-saweria-api.ct.ws';

// Welcome page (optional)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Saweria Proxy API on Railway!',
    usage: [
      'POST /saweria/check/user',
      'POST /saweria/create/payment',
      'GET  /saweria/check/payment?user_id=...&payment_id=...'
    ]
  });
});

// 1. Check user
app.post('/saweria/check/user', async (req, res) => {
  try {
    const response = await axios.post(`${SERVER_DOMAIN}/api/saweria/checkUser`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Create payment
app.post('/saweria/create/payment', async (req, res) => {
  try {
    const response = await axios.post(`${SERVER_DOMAIN}/api/saweria/createPayment`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Check payment
app.get('/saweria/check/payment', async (req, res) => {
  const { user_id, payment_id } = req.query;
  if (!user_id || !payment_id) {
    return res.status(400).json({ error: 'user_id dan payment_id wajib diisi' });
  }
  try {
    const response = await axios.get(`${SERVER_DOMAIN}/api/saweria/checkPayment/${user_id}/${payment_id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Saweria API Proxy running on port ${PORT}`);
});
