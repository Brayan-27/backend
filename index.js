const express = require("express");

const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello mi servidor express test test");
});

app.get("/otraRuta", (req, res) => {
    res.send("Mi otra tienda");
});


routerApi(app);

// Los middlewares de manejo de errores deben ir después de las rutas
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log("My port: " + port);
});


//middleare based joi validation in expressjs
//link ingrados a postman 
//get 
//http://localhost:3000/api/v1/products

//post crear
//http://localhost:3000/api/v1/products

//{
    //"name": "jose",
    //"price": 100,
    //"image": "http://example.com/image.jpg"
//}

//pach actualizar 
//http://localhost:3000/api/v1/products/1

//{
    //"price": 200
//}

//delete  eliminar 
//http://localhost:3000/api/v1/products/1

//{
    //"price": 200
//}