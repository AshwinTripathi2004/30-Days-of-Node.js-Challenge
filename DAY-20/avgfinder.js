import express from 'express';
import mongoose from 'mongoose';
const app = express();


// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema);


mongoose.connect('mongodb://127.0.0.1/db20feb')
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});



// Express route to calculate the average age of all users in MongoDB
app.get('/average-age', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]);

    if (result.length > 0) {
      res.json({ averageAge: result[0].averageAge });
    }
    else {
      res.json({ averageAge: 0 }); // If there are no users, return 0 as average age
    }
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});