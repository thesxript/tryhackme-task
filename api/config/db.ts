import mongoose, { ConnectOptions } from 'mongoose';
import { DB_CONNECT } from '.';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
    console.log('connected to db');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;
