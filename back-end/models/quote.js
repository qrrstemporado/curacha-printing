const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  title: String,
  productSelection: String,
  quantity: Number,
  size: Number,
  noOfPly: Number,
  paperSize: String,
  paperType: String,
  colorPrinting: String,
  colorForPly: [String],
  logo: String, // Assuming you store the logo URL
  vatableCost: String,
  vatAmount: String,
  totalPrice: String,
  unitPrice: String,
});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;
