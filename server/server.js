import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const port = 8001;

import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('webshop');
const categories = await db.collection('categories').find().toArray().then(arr => arr.map(o => o.name))

// import mongoose from 'mongoose';
// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/webshop');
// }
// main().catch(err => console.log(err));
// const productSchema = new mongoose.Schema({
//     name: String,
//     category: String,
//     description: String,
//     price: Number,
//     image: String,
// });



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
    response.render('index', {categories: categories}); // Render the 'index' view
});

// get all products
app.get('/products', async function (request, response) {
    const collection = db.collection('products')
    const products = await collection.aggregate([
        {
            $lookup: {
            from: "categories", 
            localField: "category", 
            foreignField: "_id", 
            as: "categoryData" 
            }
        },
        {
            $unwind: "$categoryData" 
        },
        {
            $project: {
            _id: 1,
            name: 1,
            category: "$categoryData.name",
            description: 1,
            price: 1,
            units: 1,
            image: 1
            }
        }
    ]).toArray();
    response.render("products", {data: products});
});

// get products by category
app.get('/products/:category', async function (request, response) {
    const collection = db.collection('products')
    const products = await collection.aggregate([
        {
            $lookup: {
            from: "categories", 
            localField: "category", 
            foreignField: "_id", 
            as: "categoryData" 
            }
        },
        {
            $unwind: "$categoryData" 
        },
        {
            $match: {
                "categoryData.name": request.query.category
                }
            },
        {
            $project: {
            _id: 1,
            name: 1,
            category: "$categoryData.name",
            description: 1,
            price: 1,
            units: 1,
            image: 1
            }
        }
    ]).toArray();
    response.render("products", {data: products}); 
});

// get products by keywords
app.post('/products/:search_query', async function (request, response) {
    console.log(request.body);
    // const collection = db.collection('products')
    // const products = await collection.aggregate([
    //     {
    //         $lookup: {
    //         from: "categories", 
    //         localField: "category", 
    //         foreignField: "_id", 
    //         as: "categoryData" 
    //         }
    //     },
    //     {
    //         $unwind: "$categoryData" 
    //     },
    //     {
    //         $match: {
    //             "categoryData.name": request.query.category
    //             }
    //         },
    //     {
    //         $project: {
    //         _id: 1,
    //         name: 1,
    //         category: "$categoryData.name",
    //         description: 1,
    //         price: 1,
    //         units: 1,
    //         image: 1
    //         }
    //     }
    // ]).toArray();
    // response.render("products", {data: products}); 
});

// get all products
app.get('/buy', async function (request, response) {
    console.log(request.query);
    // const collection = db.collection('products')
    // const products = await collection.aggregate([
    //     {
    //         $lookup: {
    //         from: "categories", 
    //         localField: "category", 
    //         foreignField: "_id", 
    //         as: "categoryData" 
    //         }
    //     },
    //     {
    //         $unwind: "$categoryData" 
    //     },
    //     {
    //         $project: {
    //         _id: 1,
    //         name: 1,
    //         category: "$categoryData.name",
    //         description: 1,
    //         price: 1,
    //         units: 1,
    //         image: 1
    //         }
    //     }
    // ]).toArray();
    // response.render("products", {data: products});
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