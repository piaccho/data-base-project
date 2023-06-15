# Dokumentacja
Backend naszego projektu oparty jest o serwer w technologii `Node.js` z frameworkiem `Express.js` oraz bazą danych w technologii `MongoDB` 

## Planowane funkcjonalności
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

- `_id`: Unikalny identyfikator dokumentu.

- `firstname`: Imię użytkownika. 

- `lastname`: Nazwisko użytkownika. 

- `email`: Adres e-mail użytkownika.

- `phone`: Numer telefonu użytkownika. 

- `address`: Adres użytkownika. 

- `username`: Nazwa użytkownika. 

- `password`: Hasło użytkownika. 

- `role`: Rola użytkownika. (admin, user)

- `preferedpayment`: Preferowany sposób płatności użytkownika. ("on-delivery", "card", "paypal").

- `cart`: Obiekt zawierający informacje o koszyku użytkownika.

    - `totalquantity`: Całkowita liczba produktów w koszyku.
    - `totalprice`: Całkowita cena produktów w koszyku. 
    - `items`: Tablica zawierająca przedmioty w koszyku. 

- `registerDate`: Data rejestracji użytkownika.

- `wishlists`: Tablica zawierająca listy życzeń użytkownika. 

- `orders`: Tablica zawierająca zamówienia użytkownika.

```json
{
  "_id": {
    "$oid": "648a7599d2b13ac54a17d1a4"
  },
  "firstname": "Jan",
  "lastname": "Kowalski",
  "email": "admin@onet.pl",
  "phone": "555999555",
  "address": "ul. Kijowska 15, 30-100 Kraków",
  "username": "admin",
  "password": "admin123",
  "role": "admin",
  "preferedpayment": "on-delivery",
  "cart": {
    "totalquantity": 0,
    "totalprice": 0,
    "items": []
  },
  "registerDate": {
    "$date": "2023-06-15T02:21:13.762Z"
  },
  "wishlists": [],
  "orders": [],
}
```

### 2. ***categories*** (Kategorie):
Kolekcja "categories" przechowuje informacje o kategoriach produktów w systemie. Każdy dokument reprezentuje jeden produkt i zawiera jego nazwę.

Opis:
- `_id`: Unikalny identyfikator dokumentu.

- `firstname`: Nazwa kategorii. 

Przykładowy dokument
```json
{
    "_id": 1,
    "name": "Elektronika"
}
```
### 3. ***products*** (Produkty):
Kolekcja "products" przechowuje informacje o poszczególnych produktach w systemie. Każdy dokument reprezentuje jeden produkt i zawiera jego nazwę, kategorię, opis, cenę, dostępną liczbę sztuk, obraz przedstawiający produkt oraz opinie użytkowników na jego temat.

Opis:
- `_id`: Unikalny identyfikator dokumentu w kolekcji.

- `name`: Nazwa produktu.

- `category`: Kategoria produktu.

- `description`: Opis produktu.

- `price`: Cena produktu.

- `units`: Dostępna liczba sztuk produktu.

- `image`: Adres URL obrazu przedstawiającego produkt. 

- `reviews`: Tablica zawierająca opinie na temat produktu.

    - `username`: Nazwa użytkownika, który wystawił opinię. 
    - `rating`: Ocena produktu w skali od 1 do 5.
    description: Treść opinii na temat produktu. 
    - `createdDate`: Data utworzenia opinii.
    - `_id`: Unikalny identyfikator opinii.

Przykładowy dokument
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
  ],
  "__v": 5
}
```

### 4. ***orders*** (Zamówienia):
Kolekcja "orders" przechowuje informacje o zamówieniach w systemie. Każdy dokument reprezentuje jedno zamówienie i zawiera informacje o użytkowniku składającym zamówienie, produktach zamówionych wraz z ich ilością, łącznej liczbie sztuk, łącznej cenie, adresie dostawy i statusie zamówienia.

Opis:
- `_id`: Unikalny identyfikator dokumentu w kolekcji, wygenerowany automatycznie przez MongoDB.

- `user`: Obiekt zawierający informacje o użytkowniku składającym zamówienie. Reprezentowany przez unikalny identyfikator użytkownika w kolekcji "users".

- `products`: Tablica zawierająca informacje o produktach w zamówieniu.

    - `product`: Obiekt zawierający informacje o konkretnym produkcie reprezentowany przez unikalny identyfikator produktu w kolekcji "products".
    - `quantity`: Ilość sztuk danego produktu w zamówieniu. 
    - `_id`: Unikalny identyfikator elementu zamówienia.

- `totalQuantity`: Całkowita liczba sztuk produktów w zamówieniu. 

- `totalPrice`: Całkowita cena zamówienia. 

- `address`: Adres dostawy zamówienia.

- `status`: Status zamówienia. ("pending", "shipping", "delivered").

Przykładowy dokument
```json
{
  "_id": {
    "$oid": "648a9d61191a9438fc9dab51"
  },
  "user": {
    "$oid": "648a43ff6af17772750690e9"
  },
  "products": [
    {
      "product": {
        "$oid": "6489f758d5afb1c46cab85bb"
      },
      "quantity": 1,
      "_id": {
        "$oid": "648a9d61191a9438fc9dab52"
      }
    },
    {
      "product": {
        "$oid": "6489f758d5afb1c46cab85bc"
      },
      "quantity": 1,
      "_id": {
        "$oid": "648a9d61191a9438fc9dab53"
      }
    }
  ],
  "totalQuantity": 2,
  "totalPrice": 8100,
  "address": "Słopnice 1000, 34-615 Słopnice",
  "status": "pending",
}
```



## Najciekawsze endpointy



- dodawanie produktu do koszyka
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