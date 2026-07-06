const mongoose = require('mongoose');

let cached = global._mongooseConnection;

async function connectDB() {
  if (cached && cached.readyState === 1) {
    return; // already connected
  }

  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in your .env file');
    }
    cached = await mongoose.connect(uri);
    global._mongooseConnection = cached;
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
