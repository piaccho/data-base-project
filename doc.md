# Dokumentacja
Backend naszego projektu oparty jest o serwer w technologii `Node.js` z frameworkiem `Express.js` oraz bazą danych w technologii `MongoDB` 


## Schemat bazy danych
### Specyfikacja kolekcji

#### 1. ***customers*** (Klienci):

Opis:
- `_id` - identyfikator klienta
- `firstname` - imię klienta 
- `lastname` - nazwisko klienta
- `email` - adres e-mail klienta
- `phone` - nr telefonu klienta
- `address` - adres klienta
- `login` - login klienta
- `password` - hasło klienta (haszowane przy użyciu biblioteki bcryptjs)
- `registered` - data rejestracji konta klienta


Przykładowy dokument:

```json
{
    "_id": "64651fcc334f855355b22e79",
    "firstname": "John",
    "lastname": "Smith",
    "email": "jsmith@gmail.com",
    "phone": "+ ",
    "address": " ",
    "login": "jsmith123",
    "password": "$2a$10$W76xT6.M1Qm8X89gP1HAN.WJJ/LHCRFkma6O7R0YZfAOMzmZYWqPi",
    "registerDate": "2023-05-16 20:27:21"
}
```

Przykładowy dokument
```json
{
    
}
```
#### 2. ***suppliers*** (Dostawcy):

Opis:
- `_id` - ObjectId
- `companyName` - String
- `email` - String
- `city` - String
- `street` - String
- `postalCode` - String
- `phone` - String

Przykładowy dokument
```json
{
    
}
```
#### 3. ***categories*** (Kategorie):

Opis:
- `_id` - ObjectId
- `name` - String

Przykładowy dokument
```json
{
    
}
```
#### 4. ***products*** (Produkty):

Opis:
- `_id` - ObjectId
- `name` - String
- `description` - String
- `price` - Number
- `category` - ObjectId (referencja do Kategorii)
- `image` - String (ścieżka do obrazka)

Przykładowy dokument
```json
{
    
}
```
#### 5. ***carts*** (Koszyki):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `products` - Array of Objects
- `product` - ObjectId (referencja do Produktu)
- `quantity` - Number

Przykładowy dokument
```json
{
    
}
```
#### 6. ***orders*** (Zamówienia):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `products` - Array of Objects
- `product` - ObjectId (referencja do Produktu)
- `quantity` - Number
- `total` - Number
- `address` - String
- `status` - String (np. "pending", "shipped", "delivered")

Przykładowy dokument
```json
{
    
}
```
#### 7. ***reviews*** (Recenzje):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `product` - ObjectId (referencja do Produktu)
- `rating` - Number (ocena produktu)
- `comment` - String (komentarz)

Przykładowy dokument
```json
{
    
}
```
#### 8. ***wishlists*** (Listy życzeń):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `products` - Array of ObjectId (referencje do Produktów)

Przykładowy dokument
```json
{
    
}
```
#### 9. ***payments*** (Płatności):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `order` - ObjectId (referencja do Zamówienia)
- `amount` - Number (kwota płatności)
- `paymentMethod` - String (metoda płatności, np. "karta kredytowa", "przelew bankowy")
- `status` - String (status płatności, np. "sukces", "odrzucono", "w trakcie")

Przykładowy dokument
```json
{
    
}
```
#### 10. ***promotions*** (Promocje):

Opis:
- `_id` - ObjectId
- `name` - String (nazwa promocji)
- `description` - String (opis promocji)
- `startDate` - Date (data rozpoczęcia promocji)
- `endDate` - Date (data zakończenia promocji)
- `products` - Array of ObjectId (referencje do Produktów objętych promocją)

Przykładowy dokument
```json
{
    
}
```
#### 11. ***shipping*** (Wysyłka):

Opis:
- `_id` - ObjectId
- `order` - ObjectId (referencja do Zamówienia)
- `address` - String (adres dostawy)
- `city` - String (miasto)
- `country` - String (kraj)
- `postalCode` - String (kod pocztowy)
- `trackingNumber` - String (numer śledzenia przesyłki)
- `status` - String (status wysyłki, np. "w trakcie", "dostarczono")
