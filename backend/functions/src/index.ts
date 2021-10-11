const Realm = require('realm');
import User from './models/userModel';
import { UserData } from './interface/user';
import Pin from './models/pinModel';
import { PinNumbers } from './interface/pinNumbers';

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();

const mongoose = require('mongoose');
const app = express();
const realmApp = new Realm.App({ id: process.env.REALM_ID });
const nodemailer = require('nodemailer');
const port = 8080;

const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect(process.env.MONGODB_CONNECTOR, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
}).then(() => console.log('connecting...')).catch((err: any) => { console.error(err)});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDB connection success')
});

app.get('/login', async (req: any, res: any, next: any) => {
    const saltRounds = 10;
    const loginInfo = Realm.Credentials.emailPassword(
        `${req.body.email}`,
        `${bcrypt.hashSync(req.body.pw, saltRounds)}`
    );

    try {
        const user = await realmApp.logIn(loginInfo);
        console.log('success', user)
    } catch(err) {
        console.error('err', err)
    }
});

app.post('/signup', async(req: any, res: any, next: any) => {
    const digits = 6;
    const random = Math.floor((Math.random() * Math.pow(10, digits)));
    const randomNumber = ('0'.repeat(digits) + random).slice(-digits);
    console.log(randomNumber);
    
    const transporter = await nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "rokydae@gmail.com",
            pass: `${process.env.MAILPASS}`
        }
    });

    const pinData = {
        pin: randomNumber,
        email: req.body.email
    } as PinNumbers;

    const registerPin = new Pin(pinData);
    registerPin.save()
        .then((result) => {
            console.log('result', result);
            transporter.sendMail({
                from: 'rokydae@gmail.com',
                to: req.body.email,
                subject: '[데마시아스캐너] 인증 번호입니다.',
                html: `<div>${randomNumber}</div>`
            }).then(() => {
                res.status(200).send({ success: true });
            }).catch((err: any) => {
                console.log('err', err);
                res.status(400).send({ success: false });
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send({ error: err });
        })
});

app.post('/signup/confirmed', (req: any, res: any, next: any) => {
    const saltRounds = 10;
    const signUpData = {
        id: req.body.id,
        email: req.body.email,
        pw: bcrypt.hashSync(req.body.pw, saltRounds),
        lol_id: req.body.lolId,
        // todo: momentjs로 현재시간 할당
        created: req.body.created
    } as UserData;

    const newUser = new User(signUpData);
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
