const express = require('express'); 
const conn = require('./connection/db');
const tourRouter = require('./routes/tourRouter')


const app = express();

app.use(express.json());

app.use("/api/v1/tours",tourRouter);

const PORT = 6000;

app.listen(PORT,()=>{
    console.log(`app listen on port ${PORT}`)
})
