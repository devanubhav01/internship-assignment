const mongoose = require('mongoose');

let cached = global._mongooseConnection;

async function connectDB() {
  if (cached && cached.readyState === 1) {
    return; // already connected
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI is not defined — skipping DB connection');
    return;
  }

  try {
    cached = await mongoose.connect(uri);
    global._mongooseConnection = cached;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    throw err; // let the caller handle it (don't crash serverless)
  }
}

module.exports = connectDB;
