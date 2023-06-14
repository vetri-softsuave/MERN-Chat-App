const mongoose = require("mongoose");
const {mongoDBUrl} = require('./constants');

const connectToMongo = async () =>{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoDBUrl);
        console.log("mongoDB connection successfull")
    } catch (err) {
        console.log("Error in DB connection: ", JSON.stringify(err));
    }
}

module.exports = connectToMongo;
