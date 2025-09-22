# Part-3 | Phonebook

This fullstack application has been developed following the instructions / requirements detailed in the Fullstack open courses' part-3 exercises.

## Backend

- You can access the backend: [here](https://mooc.wilpola.com/api/v1)
- Please read the below to get a more detailed view of how to use the api.
- The api uses a routePrefix `/api/v1` to use good naming practices.

### 1. Getting info

As detailed in exercise 3.2, the server must be able to provide details on the number of people that are stored in the phonebook, and the current time of the request sent to the server.

This route can be accessed from the following path:

```js
// GET Request
const path = "/api/v1/info";
```

### 2. Retrieving the entire phonebook

When you request the entire phonebook, the server will respond either with a status of 200 or 304 depending on your cached version of the data. These are successfull requests

```js
// GET Request
const path = "/api/v1/persons";
```

### 3. Get one person

You are able to request a single person from the database.

@params: id <string | number>

```tsx
// GET Request
const id: <string | number> = person.id;
const path = `/api/v1/persons/${id}`;
```

### 4. Creating a person

A person can be added to the phone book with a simple POST Request.

```tsx
// POST Request
/**
 * @params name: <string> Required
 * @params number: <string | number> Required
 * @returns {"id": <string>, "name": <string>, "number": <string>}
 */

interface IPeople {
  id: string | null;
  name: string;
  number: string | number;
}

const path = "/api/v1/person";
```

### 5. Delete Specific person

Deleting a person utilizes the persons id

@params: id <string | number>

```tsx
// Delete Request
const id: <string | number> = person.id;
const path = `api/v1/persons/${id}
```
