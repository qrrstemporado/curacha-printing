const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as needed
});

// Generate an authentication token for the admin
adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, email: this.email }, 'CPE025SOFTDES');
  return token;
};

// Hash the password before saving to the database
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin };
