const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URL;

const connectToMongo = async () =>{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoUrl);
        console.log("mongoDB connection successfull")
    } catch (err) {
        console.log("Error in DB connection: ", JSON.stringify(err));
    }
}

module.exports = connectToMongo;
