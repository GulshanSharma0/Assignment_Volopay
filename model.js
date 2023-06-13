const mongoose = require("mongoose");

// Define a Mongoose schema for the data
const analyticsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  software: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// Create a Mongoose model using the schema
const AnalyticsModel = mongoose.model("analytics", analyticsSchema);

module.exports = AnalyticsModel;
