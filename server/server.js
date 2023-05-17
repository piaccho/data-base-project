import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8001;

import mongodb from 'mongodb'
import mongoose from 'mongoose';
const MongoClient = mongodb.MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect(err => {

});
const db = client.db('webshop');


// async function getDbData() {
//     const collection = db.collection('students');
//     const query = department === "" ? {} : {'faculty': department};
//     students = await collection.find(query).toArray();
//     client.close();
// }

/* *************************** */
/* Configuring the application */
/* *************************** */
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug'); // Use the 'Pug' template system
app.locals.pretty = app.get('env') === 'development'; // The resulting HTML code will be indented in the development environment

/* ************************************************ */

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); 
app.use(express.urlencoded({ extended: false })); // for parsing form sent data


/* ******** */
/* "Routes" */
/* ******** */

// main
app.get('/', async function (request, response) {
    response.render('index', { db: db}); // Render the 'index' view
});

app.post('/products', async function (request, response) {
    const collection = db.collection('products');
    const query = department === "" ? {} : {'faculty': department};
    students = await collection.find(query).toArray();
    response.render('index', { db: db}); // Render the 'index' view
});


// basic CRUDs for all collections

// get all elements from collection
// app.get('/', async function (request, response) {
//     await getDbData();
//     response.render('index', { db: db}); // Render the 'index' view
// });

// // get a specific element from collection
// app.get('/', async function (request, response) {
//     await getDbData();
//     response.render('index', { db: db}); // Render the 'index' view
// });

// // add a new element from collection
// app.get('/', async function (request, response) {
//     await getDbData();
//     response.render('index', { db: db}); // Render the 'index' view
// });

// // update an element from collection
// app.get('/', async function (request, response) {
//     await getDbData();
//     response.render('index', { db: db}); // Render the 'index' view
// });

// // remove an element from collection
// app.get('/', async function (request, response) {
//     await getDbData();
//     response.render('index', { db: db}); // Render the 'index' view
// });




// app.get('/submit', function (request, response) {
//     response.set('Content-Type', 'text/plain')
//     response.send(`Hello ${request.query.name}`); // Send a response to the browser
// });

// app.post('/', function (request, response) {
//     response.set('Content-Type', 'text/plain')
//     response.send(`Hello ${request.body.name}`);
// });

// app.get('/query', async function(request, response) {
//     // await getDbData(request.query.department);
//     // response.render('index', { mode: true, students: students}); 
// })

/* ************************************************ */

app.listen(port, function () {
    console.log(`The server was started on port ${port}`);
    console.log('To stop the server, press "CTRL + C"');
    console.log('================================');
    console.log('Incoming HTTP requests...');
    console.log('================================');
});          