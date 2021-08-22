import User from './models/user';

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();

const mongoose = require('mongoose');
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect(process.env.MONGODB_CONNECTOR, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(() => console.log('Successfully connected to mongodb'))
.catch((err: any) => { console.error(err)});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDB connection success')
});

interface signInData {
    userId: string,
    pw: string
};

app.get('/login', (req: any, res: any, next: any) => {
    const signInData = {
        userId: req.body.userId,
        pw: req.body.pw
    } as signInData;

    // todo 에러 핸들링, 로그인 구현
    User.findOne({ id: signInData.userId }, (err: any, user: any) => {
        if (err) {
            return res.send(err);
        }
    });
});

app.post('/signup', (req: any, res: any, next: any) => {
    const newUser = new User(req.body);

    newUser.save((err) => {
        if (err) {
            if (err.message === 'There was a duplicate key error') {
                return res.status(409).send({ error: err.message });
            }
            return res.status(500).send({ error: 'unknown error' });
        }
        return res.status(200).json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Express App on port ${port}!`);
});
