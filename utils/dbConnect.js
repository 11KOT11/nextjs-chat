import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if(connection.IsConnected)return;
    
    const db = await mongoose.connect('mongodb+srv://TheNofis:25040425@shop.torpwn0.mongodb.net/shop?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    });

    connection.IsConnected = db.connections[0].readyState;
}

export default dbConnect;