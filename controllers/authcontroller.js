const User = require('../models/User'); // adjust if your path is different

const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ firstname, lastname, username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser =  async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', {
      expiresIn: '1h',
    });

    res.json({ token,  
      user: {
    id: user._id,
    email: user.email,
    firstname: user.firstname, // add this
    lastname: user.lastname,   // add this
    username: user.username    // add this if you want
  }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
