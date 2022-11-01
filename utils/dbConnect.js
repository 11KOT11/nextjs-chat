import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.IsConnected) return;

  const db = await mongoose.connect("mongodb://localhost:27017/nextjschat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.IsConnected = db.connections[0].readyState;
}

export default dbConnect;
