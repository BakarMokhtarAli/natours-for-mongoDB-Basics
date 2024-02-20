const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
const connect = mongoose.connect(DB).then(()=>{
    console.log('MONGODB connected success!');
}).catch(err=>{
    console.log(`Error: ${err.message}`);
});
module.exports = connect;