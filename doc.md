# Dokumentacja
Backend naszego projektu oparty jest o serwer w technologii `Node.js` z frameworkiem `Express.js` oraz bazą danych w technologii `MongoDB` 

## Planowane funkcjonalności
- Rejestracja i logowanie użytkowników:
    - Możliwość tworzenia konta, logowanie i zarządzania swoimi danymi.
- Zarządzanie kontem:
    - Możliwość zarządzabnia swoim kontem, aktualizowania danych osobowych, adresu dostawy, preferencji płatności itp.
- Przeglądanie i wyszukiwanie produktów:
    - Możliwość przeglądania katalogu produktów, wyszukiwania produktów na podstawie kategorii, słów kluczowych itp.
- Składanie zamówień:
    - Możliwość składania zamówienia na podstawie zawartości koszyka, wybierania opcji dostawy i płatności.
- Zarządzanie zamówieniami:
    - Możliwość śledzenia statusu zamówień, przeglądania historii zamówień i zarządzania nimi (np. anulowanie zamówienia, zgłaszanie zwrotów).
- System ocen i recenzji:
    - Możliwość wystawiania ocen i pisania recenzji na temat produktów.
- Listy życzeń:
    - Możliwość tworzenia list życzeń, dodawania produktów do listy, udostępniania ich innym użytkownikom.
- Powiadomienia:
    - Informuje mailowo użytkowników o istotnych aktualizacjach dotyczących zamówień, dostępności produktów, promocji itp.
- Śledzenie przesyłek:
    - Możliwość śledzenia statusu przesyłek, uzyskania informacji dotyczących przewoźnika i etapu dostawy.
- Panel administracyjny:
    - Dla administratorów aplikacji umożliwia zarządzanie produktami, kategoriami, zamówieniami, użytkownikami, promocjami itp.


## Schemat bazy danych
### Specyfikacja kolekcji

Część mock danych zostało wygenerowane przy pomocy [JSON GENERATOR](https://json-generator.com/)

#### 1. ***users*** (Użytkownicy):

Opis:
- `_id` - ObjectId (identyfikator użytkownika)
- `firstname` - String (imię użytkownika )
- `lastname` - String (nazwisko użytkownika)
- `email` - String (adres e-mail użytkownika)
- `phone` - String (nr telefonu użytkownika)
- `address` - String (adres użytkownika)
- `login` - String (login użytkownika)
- `password` - String (hasło użytkownika (docelowo haszowane przy użyciu biblioteki bcryptjs))
- `registered` - Date (data rejestracji konta użytkownika (jako format ISO 8601))


Przykładowy dokument:

```json
{
    "_id": "64651fcc334f855355b22e79",
    "firstname": "John",
    "lastname": "Smith",
    "email": "jsmith@gmail.com",
    "phone": "(415) 555-2671",
    "address": "56 Gotham Avenue, Nanafalia, Michigan",
    "login": "jsmith123",
    "password": "$2a$10$W76xT6.M1Qm8X89gP1HAN.WJJ/LHCRFkma6O7R0YZfAOMzmZYWqPi",
    "registerDate": "2023-03-03T21:43:01.849Z"
}
```

#### 2. ***categories*** (Kategorie):

Opis:
- `_id` - ObjectId
- `name` - String

Przykładowy dokument
```json
{
    "_id": 1,
    "name": "Elektronika"
}
```
#### 3. ***products*** (Produkty):

Opis:
- `_id` - ObjectId
- `name` - String
- `category` - ObjectId (referencja do Kategorii)
- `description` - String
- `price` - Number
- `units` - Number
- `image` - String (ścieżka do obrazka)

Przykładowy dokument
```json
{
    "name": "Spodnie jeans Levi",
    "category": 2,
    "description": "Aliqua tempor pariatur voluptate magna qui proident commodo ullamco. Exercitation ea aliqua nostrud excepteur cillum.",
    "price": 400,
    "units": 100,
    "image": "https://fakeimg.pl/350x300/?font_size=30&text=Spodnie+jeans+Levi"
}
```

#### 4. ***orders*** (Zamówienia):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `products` - Array of Objects
- `quantity` - Number
- `total` - Number
- `address` - String
- `status` - String (np. "pending", "shipped", "delivered")

Przykładowy dokument
```json
{

}
```
#### 5. ***reviews*** (Oceny):

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
#### 6. ***suppliers*** (Dostawcy):

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

#### 7. ***wishlists*** (Listy życzeń):

Opis:
- `_id` - ObjectId
- `user` - ObjectId (referencja do Użytkownika)
- `products` - Array of ObjectId (referencje do Produktów)

Przykładowy dokument
```json
{

}
```
