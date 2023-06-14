import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 8001;
const uri = process.env.MONGODB_URI || 'mongodb+srv://piacho:piacho123@db-mongodb.axn6csn.mongodb.net/webshop?retryWrites=true&w=majority'

// connect to db
await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
        process.exit();
    });

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan('dev'));
app.use(express.static(__dirname + '/src/public')); 
app.use(express.urlencoded({ extended: false })); // for parsing form sent data

/* ************************************************ */

/* ******** */
/* "Routes" */
/* ******** */

import indexRouter from './src/routes/indexRouter.js';
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';
// import adminRouter from './src/routes/adminRouter.js';

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
// app.use('/admin', adminRouter);

// Obsługa błędów 404 (Nie znaleziono)
app.use((req, res, next) => {
    res.status(404).send('Not found');
});

// Obsługa innych błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

/* ************************************************ */

app.listen(port, function () {
    console.log('================================');
    console.log(`The server was started on port ${port}`);
    console.log('To stop the server, press "CTRL + C"');
    console.log('================================');
    console.log('Incoming HTTP requests...');
    console.log('================================');
});          