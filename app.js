require("dotenv").config();

//async errors
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const router = require("./routes/products");

const errorhandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", router);

app.use(notFound);
app.use(errorhandler);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
