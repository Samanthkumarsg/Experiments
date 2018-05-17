# Tourism REST API
This web application is to manage the tours and travels based business electronically through REST API system. All the requests and responses are made by HTTP and a sophisticated API handles all of it. This application follows API first mechanism. And uses JWT instead of Sessions

## API Requests
|Request|Route| Description | Attachments
|-|--|--|--|
| GET | /packages | Gets all the data from packages model | null
| POST | /packages | Adds a data to packages model | name, price, places, duration.day, duration.night.
| GET | /packages/:id | Gets the data of the id passed as a parameter | null
| PATCH | /packages/:id | Modifies one value in the model | [{ propname : --, propvalue : -- }]
| DELETE | /packages/:id | Deletes the data of the id passed as a parameter | null
| PUT | /packages/:id | Updates the data of the id passed as a parameter | { the data to be modified }

> Under development !