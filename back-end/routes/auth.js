const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const email = req.body.email;
    const password = req.body.password;

    // Check if the user is a regular user or admin
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = user.generateAuthToken();
        const loginMessage = user.userType === 'admin' ? 'Admin' : 'User';
        return res.status(200).send({
          data: token,
          userType: user.userType,
          message: `${loginMessage} login successfully`,
        });
      }
    }

    // If no matching user is found
    return res.status(401).send({ message: 'Invalid Email or Password' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = router;
