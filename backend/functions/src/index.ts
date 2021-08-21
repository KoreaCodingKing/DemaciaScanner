import User from './models/user';
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();

const mongoose = require('mongoose');
const app = express();
const port = 8080;

// app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
mongoose.connect(process.env.MONGODB_CONNECTOR, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true 
})
.then(() => console.log('Successfully connected to mongodb'))
.catch((err: any) => { console.log('iserror?'); console.error('1', err)});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDB connection success')
});

app.get('/login', (req: any, res: any) => {
    // Todo: 테스트 해보기 및 login 기능 추가
    User.findOne({ id: 'yrkim' }, (err: any, user: any) => {
        return res.json({ login: true })
    });
})

app.post('/signup', (req: any, res: any) => {
    // Todo: 테스트 해보기 및 signup 기능 추가
    const newUser = new User({
        id: 'yrkim',
        lolid: '저렴한 핫바',
        pw: 'zxaser1325!',
        created: new Date()
    });

    newUser.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    })
})

app.listen(port, () => {
    console.log(`Express App on port ${port}!`);
});
