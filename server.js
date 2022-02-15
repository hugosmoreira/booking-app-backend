import express from 'express';
import {readdirSync} from 'fs';   
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// db connection

mongoose.connect(process.env.DATABASE)
 .then(() => console.log('DB Connected'))
 .catch((err) => console.log('DB Connection Error', err));


// Middlewares
app.use(cors());
app.use(morgan('dev'));

// route middleware
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
    


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log('Server listening on port 8000');
})