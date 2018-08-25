# Experiments with REST API

This project in this repository is my `REST API` experiment, it is to manage the tourism based business electronically through REST API methodology. All the requests and responses are made by `HTTP` and a sophisticated API handles all of it. This application uses `JWT` instead of sessions

### Installation

Copy and paste following code on your terminal

```
https://github.com/velansalis/REST-API.xpmt.git
cd REST-API.xpmt
npm install
npm run start
```

### Using the System

All the requests are made to the server as follows

```
<domain-name> <route>
GET : https://example.com/users
DELETE : https://example.com/users/126fhs2
```

Where `126fhs2` is the ID of the user

### API Information

| Routes   | Methods                       | Description                                                                 |
| -------- | ----------------------------- | --------------------------------------------------------------------------- |
| users    | GET, PUT, POST, DELETE, PATCH | Manages the users that have registered on the system                        |
| packages | GET, PUT, POST, DELETE, PATCH | Manages the tour packages that the user can currently access while browsing |
| orders   | GET, PUT, POST, DELETE, PATCH | Manages the orders made by the user                                         |
| logs     | GET                           | Returns all the transactions and actions done by the user on the server     |

### Tailend

This project is just a representation of how the node server works when Implemented with REST API and JSON web tokens. POST, DELETE and other requests can be made by using any applications like Postman or any other applications or techniques.
