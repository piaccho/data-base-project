import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import {validateAccountData, hashPassword, checkPassword} from './utility.js'

const port = 8001;

import mongodb, { ObjectId } from 'mongodb';

const MongoClient = mongodb.MongoClient;
const client = new MongoClient('mongodb://127.0.0.1:27017');
await client.connect();
const db = client.db('webshop');
const categories = await db.collection('categories').find().toArray().then(arr => arr.map(o => o.name))
// const users = await db.collection('customers').find().toArray().then(arr => arr.map(o => 
//     {
//         username: o.login, 
//         password: o.password
//     }
//     ));
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
app.get('/', async function (req, res) {
    res.render('index', {categories: categories}); // Render the 'index' view
});

// show customers
app.get('/customers', async (req, res) => {
    res.json(await db.collection("customers").find().toArray());
});

// get all products
app.get('/products', async function (req, res) {
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
    res.render("products", {data: products});
});

// get products by category
app.get('/products/:category', async function (req, res) {
    console.log("GET products category");
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
                "categoryData.name": req.query.category
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
    res.render("products", {data: products}); 
});

// get products by keywords
app.get('/search_query', async function (req, res) {
    const { query } = req.query; 
    try {
        // Wyszukaj produkty, które pasują do zadanego słowa kluczowego
        const products = await db.collection('products').find({
            $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            ]
        })
        .toArray();
        console.log(products);
        res.render('products', {data: products})
    } catch (error) {
        console.error('Error searching for products:', error);
        res.status(500).send('An error occurred');
    }
    
    // res.render("products", {data: products}); 
});

app.get('/hashpass', (req, res) => {
    const password =  hashPassword(req.query.password);
    console.log({password});
})

app.get('/testpass', (req, res) => {
    const samePass = checkPassword(req.query.password, db);
    console.log({samePass});
})

// register an account
app.post('/register', async (req, res) => {
    console.log(req.body);
    if(await validateAccountData(req.body, db, res) !== null) {
        const {
            firstname,
            lastname,
            email,
            phone,
            address,
            username,
        } = req.body;
        
        // const password = await hashPassword(req.body.password);
        const password = 
        
        db.collection('users').insertOne({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            username: username,
            password: password,
        })
        res.send("Registration was successfull")
    }
});


// // buy product
// app.get('/buy', async function (req, res) {
//     console.log(req.query);
//     const prodId = req.query._id
//     const quantity = req.query.quantity;
//     // db.collection('products').updateOne(
//     //     { _id: ObjectId(prodId) },
//     //     { $inc: { units: -quantity } }
//     // );
//     // db.collection("products").updateOne({"_id": prodId}, {$inc: {units: -quantity}})
//     // db.collection("products").findOneAndUpdate( {query: {_id: req.query._id, units: {$gt: quantity} }, update: {$dec: {units: quantity}}})
//     // const prodName = db.collection("products").find({_id: req.query._id});
//     res.send("Product has been bought");
// });


// // login
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   // Sprawdzanie, czy użytkownik istnieje i czy podane hasło jest poprawne
//   const user = users.find(user => user.username === username && user.password === password);
//   if (!user) {
//     return res.status(401).json({ message: 'Niepoprawne dane logowania' });
//   }

//   // create session
//   req.session = {
//     user: {
//       username: user.username
//     }
//   };

//   res.json({ message: 'Zalogowano pomyślnie'});
// });

// // auth middleware
// const authenticateUser = (req, res, next) => {
//   if (!req.session || !req.session.user) {
//     return res.status(401).json({ message: 'No auth' });
//   }

//   // Przekazanie informacji o zalogowanym użytkowniku do kolejnych handlerów
//   res.locals.user = req.session.user;
//   next();
// };

// // customer panel
// app.get('/client', authenticateUser, (req, res) => {
//   if (res.locals.user.role !== 'client') {
//     return res.status(403).json({ message: 'Brak uprawnień' });
//   }

//   // logic

//   res.json({ message: 'Customer panel' });
// });

// // admin panel
// app.get('/admin', authenticateUser, (req, res) => {
//   if (res.locals.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Brak uprawnień' });
//   }

//   // logic
  
//   res.json({ message: 'Admin panel' });
// });


/* ************************************************ */

app.listen(port, function () {
    console.log(`The server was started on port ${port}`);
    console.log('To stop the server, press "CTRL + C"');
    console.log('================================');
    console.log('Incoming HTTP requests...');
    console.log('================================');
});          