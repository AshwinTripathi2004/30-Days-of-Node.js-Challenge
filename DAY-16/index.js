const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Replace with your actual MongoDB connection string
const MONGO_URI = 'mongodb://your_mongodb_server_ip:27017/cluster0';


// Function to connect to the MongoDB database
const connectToMongoDB = async () => {
    try {
        mongoose.connect(MONGO_URI);
        console.log('Successfully connected to MongoDB database!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the application if connection fails
    }
};

// Connect to MongoDB before starting the server
connectToMongoDB();

// Your other Express application code here...

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});