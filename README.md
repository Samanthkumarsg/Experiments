# Tourism REST API

> Introduction

This website is to manage the tours and travels based business electronically through REST API system. All the requests and responses are made by HTTP and a sophisticated API handles all of it. This application follows API first mechanism. And uses JWT instead of Sessions

> Available routes are as follows
- /users - (GET, PUT, POST, DELETE, PATCH) 
- /packages - (GET, PUT, POST, DELETE, PATCH) 
- /orders - (GET, PUT, POST, DELETE, PATCH) 
- /logs - (GET, PUT, POST, DELETE, PATCH) 

> Details
- /users - To manage the user details
- /packages - To manage the tourism packages
- /orders - To store user and packages details after ordering by refering the above two models
- /logs - Stores all the operations on the server using JWT with username, timestamp,request type and route

> Epilogue

This project is just a representation of how the node server works when Implemented with REST API and JSON web tokens. So this project just has a backend and no front end or a view. POST, DELETE and other requests can be made by using any applications like Postman to the server address specified. Happy coding :)