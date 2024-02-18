import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://localhost:27017/Task17", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);

    await newUser.save();

    console.log("User added successfully", user);
  } catch (error) {
    console.error("Error adding user to database:", error);
  }
}

addUserToDatabase({ username: "john_doe", email: "john@example.com" });