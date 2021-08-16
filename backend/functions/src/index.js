const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();

const router = require('router');
const db = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyparser.json());
db.connect(process.env.MONGODB_CONNECTOR, {useNewUrlParser: true})
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.listen(port, () => {
    console.log(`Express App on port ${port}!`);
});

module.exports = app;
