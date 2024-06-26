const mongoose = require('mongoose'); 

//define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels'

//setup mongodb connection
mongoose.connect(mongoURL, {})

//get the default conncetion
//mongoose maintains a default conncetion object representing the mongodb connection

const db = mongoose.connection;

//define event listeners for database conncetion
//these reacts to the different state of databse

db.on('connected' ,() => {
    console.log('connected');
})
db.on('error', (err) => {
    console.error("there is some error",err);
})
db.on('disconnected', () => {
    console.log('disconnected')
})

//export the database connection

module.exports = db