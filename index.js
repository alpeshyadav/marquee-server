require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { errorHandler } = require("./src/errorHandler");
const { db } = require("./src/models");
const { routes } = require("./src/routes");

db.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());
routes(app);

app.use(errorHandler);

app.listen(process.env.API_PORT, () =>
    console.log(`Listening on ${process.env.API_PORT}`)
);
