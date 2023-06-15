Projekt ten jest aplikacją internetowa sklepu internetowego, który umożliwia użytkownikom rejestrację, logowanie oraz przeglądanie i wyszukiwanie produktów. Użytkownicy mogą składać zamówienia na podstawie zawartości koszyka, a także wystawiać oceny i recenzje produktów. Istnieje również panel administracyjny, który umożliwia zarządzanie produktami, kategoriami i innymi elementami systemu.

# Dokumentacja
Backend naszego projektu oparty jest o serwer w technologii `Node.js` z frameworkiem `Express.js` oraz bazą danych w technologii `MongoDB` 

## Funkcjonalności
- Rejestracja i logowanie użytkowników:
    - Możliwość tworzenia konta oraz logowanie.
- Przeglądanie i wyszukiwanie produktów:
    - Możliwość przeglądania katalogu produktów, wyszukiwania produktów na podstawie kategorii, słów kluczowych itp.
- Składanie zamówień:
    - Możliwość składania zamówienia na podstawie zawartości koszyka.
- System ocen i recenzji:
    - Możliwość wystawiania ocen i pisania recenzji na temat produktów.
- Panel administracyjny:
    - Dla administratorów aplikacji umożliwia zarządzanie produktami, kategoriami itp.


## Specyfikacja kolekcji

Część mock danych zostało wygenerowane przy pomocy [JSON GENERATOR](https://json-generator.com/)

### 1. ***users*** (Użytkownicy):

Kolekcja "users" przechowuje informacje o poszczególnych użytkownikach w systemie. Każdy dokument reprezentuje jednego użytkownika i zawiera jego dane osobowe, informacje dotyczące konta, koszyka, zamówień itp.

Opis:
- `_id` : ObjectId (identyfikator użytkownika)
- `firstname` : String (imię użytkownika)
- `lastname` : String (nazwisko użytkownika)
- `email` : String (adres e-mail użytkownika)
- `phone` : String (numer telefonu użytkownika)
- `address` : String (adres użytkownika)
- `username` : String (nazwa użytkownika)
- `password` : String (hasło użytkownika)
- `role` : String (rola użytkownika)
- `preferedpayment` : String (preferowany sposób płatności)
- `cart` : Object (koszyk użytkownika)
    - `totalQuantity` : Number (łączna ilość przedmiotów w koszyku)
    - `totalPrice` : Number (łączna cena przedmiotów w koszyku)
    - `items` : Array (tablica przedmiotów w koszyku)
        - `product` : Object (informacje o produkcie) (kolekcja 'product')
            - `name` : String (nazwa produktu)
            - `category` : String (kategoria produktu)
            - `description` : String (opis produktu)
            - `price` : Number (cena produktu)
            - `units` : Number (dostępna ilość produktu)
            - `image` : String (URL do zdjęcia produktu)
            - `reviews` : Array (tablica recenzji produktu)
                - `username` : String (nazwa użytkownika recenzującego)
                - `rating` : Number (ocena produktu)
                - `description` : String (opis recenzji)
                - `createdDate` : Date (data utworzenia recenzji)
                - `_id` : ObjectId (identyfikator recenzji)
            - `_id` : ObjectId (identyfikator produktu)
        - `quantity` : Number (ilość danego produktu w koszyku)
        - `_id` : ObjectId (identyfikator elementu koszyka)
- `registerDate` : Date (data rejestracji użytkownika)
- `orders` : Array (tablica zamówień użytkownika) (kolekcja 'order')
    - `user` : ObjectId (identyfikator użytkownika)
    - `products` : Array (tablica produktów w zamówieniu)
        - `product` : ObjectId (identyfikator produktu)
        - `quantity` : Number (ilość danego produktu w zamówieniu)
        - `_id` : ObjectId (identyfikator elementu zamówienia)
    - `totalQuantity` : Number (łączna ilość przedmiotów w zamówieniu)
    - `totalPrice` : Number (łączna cena przedmiotów w zamówieniu)
    - `address` : String (adres dostawy zamówienia)
    - `status` : String (status zamówienia)
    - `_id` : ObjectId (identyfikator zamówienia)

<br/>
<br/>

Przykładowy dokument: Dokument przedstawia użytkownika, który posiada w koszyku 2 różne produkty
```json
{
  "_id": {
    "$oid": "648ad0038026b16839f61d3f"
  },
  "firstname": "Łukasz",
  "lastname": "Dydek",
  "email": "dydek@onet.pl",
  "phone": "123132213",
  "address": "Kolorowa 86, 32-091 Kraków",
  "username": "dydek",
  "password": "dydek123",
  "role": "user",
  "preferedpayment": "on-delivery",
  "cart": {
    "totalQuantity": 7,
    "totalPrice": 8400,
    "items": [
      {
        "product": {
          "name": "Piłka nożna Adidas",
          "category": "Sport i rekreacja",
          "description": "Piłka nożna Adidas to profesjonalna piłka do gry w piłkę nożną. Wykonana z wysokiej jakości materiałów, zapewniających trwałość i doskonałe właściwości piłki. Posiada atrakcyjny design i spełnia standardy wyznaczone przez federację piłkarską.",
          "price": 200,
          "units": 98,
          "image": "https://fakeimg.pl/350x300/?font_size=30&text=Pi%C5%82ka+no%C5%BCna+Adidas",
          "reviews": [],
          "_id": {
            "$oid": "6489f758d5afb1c46cab85df"
          }
        },
        "quantity": 5,
        "_id": {
          "$oid": "648ad2008026b16839f61de1"
        }
      },
      {
        "product": {
          "name": "Smartfon iPhone 14 Pro",
          "category": "Elektronika",
          "description": "Smartfon iPhone 14 Pro to najnowszy model telefonu marki Apple. Wyposażony w zaawansowany procesor, duży ekran o wysokiej rozdzielczości oraz innowacyjny system operacyjny. Posiada doskonałą jakość wykonania i wiele funkcji, które umożliwiają korzystanie z najnowszych technologii.",
          "price": 3700,
          "units": 69,
          "image": "https://fakeimg.pl/350x300/?font_size=30&text=Smartfon%20iPhone%20X",
          "reviews": [
            {
              "username": "piacho",
              "rating": 1,
              "description": "Okropny sprzęt",
              "createdDate": {
                "$date": "2023-06-15T03:53:24.792Z"
              },
              "_id": {
                "$oid": "648a8b34b7c02e2425d47070"
              }
            },
            {
              "username": "dydek",
              "rating": 4,
              "description": "Całkiem spoko smartfonik",
              "createdDate": {
                "$date": "2023-06-15T04:06:14.991Z"
              },
              "_id": {
                "$oid": "648a8e369aa340130d6086d4"
              }
            }
          ],
          "_id": {
            "$oid": "6489f758d5afb1c46cab85bb"
          }
        },
        "quantity": 2,
        "_id": {
          "$oid": "648af0138026b16839f61e95"
        }
      }
    ]
  },
  "registerDate": {
    "$date": "2023-06-15T08:46:59.600Z"
  },
  "orders": [
    {
      "user": {
        "$oid": "648ad0038026b16839f61d3f"
      },
      "products": [
        {
          "product": {
            "$oid": "6489f758d5afb1c46cab85d6"
          },
          "quantity": 2,
          "_id": {
            "$oid": "648ad1b98026b16839f61dc2"
          }
        },
        {
          "product": {
            "$oid": "6489f758d5afb1c46cab85df"
          },
          "quantity": 2,
          "_id": {
            "$oid": "648ad1b98026b16839f61dc3"
          }
        }
      ],
      "totalQuantity": 4,
      "totalPrice": 600,
      "address": "Legionowa 86, 32-091 Michałowice",
      "status": "pending",
      "_id": {
        "$oid": "648ad1b98026b16839f61dc1"
      },
      "__v": 0
    }
  ],
}
```
<br/>
<br/>

### 2. ***categories*** (Kategorie):
Kolekcja "categories" przechowuje informacje o kategoriach produktów w systemie. Każdy dokument reprezentuje jeden produkt i zawiera jego nazwę.

Opis:
- `_id`: ObjectId (identyfikator kategorii)
- `name`: String (nazwa kategorii) 
<br/>
<br/>

Przykładowy dokument:
```json
{
    "_id": 1,
    "name": "Elektronika"
}
```
<br/>
<br/>

### 3. ***products*** (Produkty):
Kolekcja "products" przechowuje informacje o poszczególnych produktach w systemie. Każdy dokument reprezentuje jeden produkt i zawiera jego nazwę, kategorię, opis, cenę, dostępną liczbę sztuk, obraz przedstawiający produkt oraz opinie użytkowników na jego temat.

Opis:
- `_id` : ObjectId (identyfikator produktu)
- `name` : String (nazwa produktu)
- `category` : String (kategoria produktu)
- `description` : String (opis produktu)
- `price` : Number (cena produktu)
- `units` : Number (dostępna ilość produktu)
- `image` : String (URL do zdjęcia produktu)
- `reviews` : Array (tablica recenzji produktu)
    - `username` : String (nazwa użytkownika recenzującego)
    - `rating` : Number (ocena produktu)
    - `description` : String (opis recenzji)
    - `createdDate` : Date (data utworzenia recenzji)
    - `_id` : ObjectId (identyfikator recenzji)
<br/>
<br/>

Przykładowy dokument: Dokument przedstawia produkt smartfona z dwoma recenzjami.
```json
{
  "_id": {
    "$oid": "6489f758d5afb1c46cab85bb"
  },
  "name": "Smartfon iPhone 14 Pro",
  "category": "Elektronika",
  "description": "Smartfon iPhone 14 Pro to najnowszy model telefonu marki Apple. Wyposażony w zaawansowany procesor, duży ekran o wysokiej rozdzielczości oraz innowacyjny system operacyjny. Posiada doskonałą jakość wykonania i wiele funkcji, które umożliwiają korzystanie z najnowszych technologii.",
  "price": 3700,
  "units": 69,
  "image": "https://fakeimg.pl/350x300/?font_size=30&text=Smartfon%20iPhone%20X",
  "reviews": [
    {
      "username": "piacho",
      "rating": 1,
      "description": "Okropny sprzęt",
      "createdDate": {
        "$date": "2023-06-15T03:53:24.792Z"
      },
      "_id": {
        "$oid": "648a8b34b7c02e2425d47070"
      }
    },
    {
      "username": "dydson",
      "rating": 4,
      "description": "Całkiem spoko smartfonik",
      "createdDate": {
        "$date": "2023-06-15T04:06:14.991Z"
      },
      "_id": {
        "$oid": "648a8e369aa340130d6086d4"
      }
    },
  ]
}
```
<br/>
<br/>

### 4. ***orders*** (Zamówienia):
Kolekcja "orders" przechowuje informacje o zamówieniach w systemie. Każdy dokument reprezentuje jedno zamówienie i zawiera informacje o użytkowniku składającym zamówienie, produktach zamówionych wraz z ich ilością, łącznej liczbie sztuk, łącznej cenie, adresie dostawy i statusie zamówienia.

Opis:
- `_id` : ObjectId (identyfikator zamówienia)
- `user` : ObjectId (identyfikator użytkownika składającego zamówienie) (referencja do kolekcji 'users')
- `products` : Array (tablica produktów w zamówieniu) 
    - `product` : ObjectId (identyfikator produktu) (referencja do kolekcji 'products')
    - `quantity` : Number (ilość produktu w zamówieniu)
    - `_id` : ObjectId (identyfikator elementu w tablicy)
- `totalQuantity` : Number (łączna ilość produktów w zamówieniu)
- `totalPrice` : Number (łączna cena zamówienia)
- `address` : String (adres dostawy zamówienia)
- `status` : String (status zamówienia)
<br/>
<br/>

Przykładowy dokument: Dokument przedstawia zamówienie na dwa produkty na konkretnego użytkownika
```json
{
  "_id": {
    "$oid": "648ad1b98026b16839f61dc1"
  },
  "user": {
    "$oid": "648ad0038026b16839f61d3f"
  },
  "products": [
    {
      "product": {
        "$oid": "6489f758d5afb1c46cab85d6"
      },
      "quantity": 2,
      "_id": {
        "$oid": "648ad1b98026b16839f61dc2"
      }
    },
    {
      "product": {
        "$oid": "6489f758d5afb1c46cab85df"
      },
      "quantity": 2,
      "_id": {
        "$oid": "648ad1b98026b16839f61dc3"
      }
    }
  ],
  "totalQuantity": 4,
  "totalPrice": 600,
  "status": "pending"
}
```


## Najciekawsze endpointy
```js
// Użyte trasy
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);
```


- dodawanie produktu do koszyka
```js
// indexRouter
router.post('/add-product-to-cart', indexController.addProductToCart);
```
```js
addProductToCart: async (req, res) => {
        let quantity = parseInt(req.body.quantity);
        const {productid, userid} = req.body
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })

        const product = await Product.findById(productid);

        // check if cartItem exists
        const existingItem = user.cart.items.find(item => item.product.equals(product));

        if (existingItem) {
            if (existingItem.quantity + quantity > product.units) {
                return res.status(400).json({ error: 'Quantity exceeds product units' });
            }
            existingItem.quantity += quantity;
        } else {
            if (quantity > product.units) {
                return res.status(400).json({ error: 'Quantity exceeds product units' });
            }
            user.cart.items.push({ product: product, quantity });
        }

        // update total price and quantity
        user.cart.totalQuantity += quantity;
        user.cart.totalPrice += quantity * product.price;

        await user.save();

        res.redirect("/products" + userQuery(user));
    }

```
- dodawanie recenzji do produktu
```js
// indexRouter
router.post('/product/review', indexController.postReview);
```
```js
postReview: async (req, res) => {
        const {rating, description, productid, userid} = req.body;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })
        
        // check if product exists
        const product = await Product.findOne({ _id: productid });
        if(!product) {
            return res.status(400).json({ error: 'Couldnt find the product' });
        }

        // create new review
        const newReview = new Review({
            username: user.username,
            rating,
            description
        });

        product.reviews.push(newReview);

        await product.save();

        res.redirect("/product" + userQuery(user) + "&productid=" + productid);
    }
```
- wyszukiwanie produktów po nazwie
```js
// indexRouter
router.get('/search', indexController.searchProductsByKeywords);
```
```js
searchProductsByKeywords: async (req, res) => {
        const user = await signinUser(req.query.username, req.query.password);

        const query = req.query.query;
        const allProductsByQuery = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        });
        res.render("products", { data: allProductsByQuery, user: user });
    }
```

- rejestracja konta
```js
// authRouter
router.post('/sign-up', authController.createAccount);
```
```js
createAccount: async (req, res) => {
        try {
            const {
                email,
                username,
                password,
                firstname,
                lastname,
                address,
                phone,
            } = req.body;

            // validate fields
            if (!validateEmail(email)) {
                return res.status(400).json({ error: 'Incorrect email.' });
            }
            if (!validateUsername(username)) {
                return res.status(400).json({ error: 'Username must be at least 6 characters long.' });
            }
            if (!validatePassword(password)) {
                return res.status(400).json({ error: 'The password must have at least 8 characters, one capital letter and one number' });
            }


            // check if user exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(400).json({ error: 'User with given email address already exists.' });
                } else if (existingUser.username === username) {
                    return res.status(400).json({ error: 'User with given email address already exists.' });
                }
            }

            // create new user
            const user = new User({
                firstname,
                lastname,
                email,
                phone,
                address,
                username,
                password,
            });

            await user.save();

            res.render('sign', { flag: "sign-in", created: true });
        } catch (error) {
            res.status(500).json({ error: "Register error: " + error });
        }
    }
```

- modyfikacja produktów w koszyku
```js
// userRouter
router.post('/cart/modify', userController.modifyCartItem);
```
```js
modifyCartItem: async (req, res) => {
        let newQuantity = parseInt(req.body.quantity);
        const { productid, userid } = req.body
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" })

        const product = await Product.findById(productid);

        // check if cartItem exists
        const modifiedItem = user.cart.items.find(item => item.product.equals(product));

        if (!modifiedItem) {
            return res.status(400).json({ error: 'Cannot find an a product' });
        } 

        if (newQuantity > product.units) {
            return res.status(400).json({ error: 'Quantity exceeds product units' });
        }

        const previousQuantity = modifiedItem.quantity;
        modifiedItem.quantity = newQuantity;

        // update total price and quantity
        user.cart.totalQuantity = user.cart.totalQuantity - previousQuantity + newQuantity;
        user.cart.totalPrice = user.cart.totalPrice + (newQuantity - previousQuantity) * product.price;

        await user.save();

        res.redirect("/user/cart" + userQuery(user));
    }
```

- przetwarzanie zamówienia
```js
// userRouter
router.post('/order/submit', userController.proceedOrder);
```
```js
proceedOrder: async (req, res) => {
        console.log(req.body);
        const userid = req.body.userid;
        const user = await signinUserId(userid);
        if (!user) res.status(400).json({ status: "You are not logged in" });

        let total = 0;
        for (const item of user.cart.items) {
            const productId = item.product._id;
            const quantity = item.quantity;

            const product = await Product.findById(productId);
            if (!product) {
                console.log(`Couldnt find product ${productId}.`);
                continue;
            }

            product.units -= quantity;
            total = quantity * product.price;

            await product.save();

            console.log(`Updated product units ${product.name}.`);
        }

        user.cart.items.forEach(item => {console.log(item);})

        const newOrder = new Order({
            user: user,
            products: user.cart.items.map(item => ({
                product: item.product,
                quantity: item.quantity,
            })),
            totalQuantity: user.cart.totalQuantity,
            totalPrice: user.cart.totalPrice,
            address: user.address,
            status: 'pending',
        });


        await newOrder.save();

        user.cart.totalQuantity = 0;
        user.cart.totalPrice = 0;
        user.cart.items = [];
        user.orders.push(newOrder);
        await user.save();

        res.redirect("/" + userQuery(user));
    }
```
