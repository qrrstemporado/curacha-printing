const router = require('express').Router();
const { User } = require('../models/user');
const { Admin } = require('../models/admin');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Check if the user is a regular user
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = user.generateAuthToken();
        return res.status(200).send({ data: token, message: 'User logged in successfully' });
      }
    }

    // Check if the user is an admin
    const admin = await Admin.findOne({ email });
    if (admin) {
      // Remove the console.log statement and the subsequent if condition
      const validPassword = await bcrypt.compare(password, admin.password);
      if (validPassword) {
        const token = admin.generateAuthToken();
        return res.status(200).send({ data: token, message: 'Admin logged in successfully' });
      }
    }

    // If no matching user or admin is found
    return res.status(401).send({ message: 'Invalid Email or Password' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password')
  });
  return schema.validate(data);
}

module.exports = router;
