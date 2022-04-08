const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/auth')

//Calling the dotenv
dotenv.config();
port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Connected to Database')})
.catch((err)=>{console.log(err)});

// this will parse json from reqs and made it available in req.body in router
app.use(express.json());

//  in this middleware / will be neglected in URL

app.use('/',router)


app.listen(port,()=>{
    console.log(`Server is listening to requests on http://localhost:${port}`)
})