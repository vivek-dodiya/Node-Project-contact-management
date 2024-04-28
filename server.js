const { json } = require('body-parser');
const { name } = require('ejs');
const express = require('express');
const errorHendler = require('./middleware/errorHendler');
const connectDb = require('./config/dbconnection');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
connectDb();
// app.use(bodyParser.json())
app.use(express.json());
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/user' , require('./routes/userRouts'))
app.use(errorHendler);

app.listen(port,()=>{
    console.log(`server is stsrt... on ${port}`);
});
