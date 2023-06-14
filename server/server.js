import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 8001;

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


// app.get('/hashpass', (req, res) => {
//     const password =  hashPassword(req.query.password);
//     console.log({password});
// })

// app.get('/testpass', (req, res) => {
//     const samePass = checkPassword(req.query.password, db);
//     console.log({samePass});
// })

// // register an account
// app.post('/register', async (req, res) => {
//     console.log(req.body);
//     if(await validateAccountData(req.body, db, res) !== null) {
//         const {
//             firstname,
//             lastname,
//             email,
//             phone,
//             address,
//             username,
//         } = req.body;
        
//         // const password = await hashPassword(req.body.password);
//         const password = 
        
//         db.collection('users').insertOne({
//             firstname: firstname,
//             lastname: lastname,
//             email: email,
//             phone: phone,
//             address: address,
//             username: username,
//             password: password,
//         })
//         res.send("Registration was successfull")
//     }
// });


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
    console.log('================================');
    console.log(`The server was started on port ${port}`);
    console.log('To stop the server, press "CTRL + C"');
    console.log('================================');
    console.log('Incoming HTTP requests...');
    console.log('================================');
});          