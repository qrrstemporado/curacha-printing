const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

// POST route to handle form submissions
router.post('/', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET route to fetch all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
