const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1/mydb19feb');
const db = mongoose.connection;

// Define User Schema with email validation
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        // Regular expression for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});

// Define User model
const User = mongoose.model('User', userSchema);

// Function to add a new user with validation
async function addUserWithValidation(user) {
  try {
    // Create a new user instance
    const newUser = new User(user);
    // Save the user to the database
    await newUser.save();
    console.log('User successfully added:', newUser);
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

// Test Cases
addUserWithValidation({ username: 'harrypotter', email: 'harry@gmail.com' });