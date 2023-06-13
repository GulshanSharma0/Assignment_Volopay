
<br />
<div align="center">
  <h3 align="center">Assignment</h3>
</div>

## API endpoints

* `/api/total_items`
* `/api/nth_most_total_item`
* `/api/percentage_of_department_wise_sold_items`
* `/api/monthly_sales`

### Built With

* [![NodeJS][NodeJS]][node-url]
* [![ExpressJS][ExpressJs]][express-url]
* [![MongoDB][MongoDB]][mongoDB-url]

## Installation

Below are the methods needed to follow to get it running locally.

### Prerequisites

This is a list of things you need to use the project.
* npm
* mongodb (optional, you can use mongodb atlas)

### Steps

1. Install NPM packages
   ```sh
   npm i
   ```
2. Create a ``.env` file, and add the mongodb url, or simply change `.env.example` to `.env` to use mongodb atlas 
3. Seed the database 
  ```sh
  node importExcelToMongo.js
  ```
4. Run the server
  ```sh
  node server.js
  ```

[ExpressJS]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: http://expressjs.com/

[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[mongoDB-url]: https://www.mongodb.com/

[NodeJS]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en
