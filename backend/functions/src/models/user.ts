const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    id: String,
    lolid: String,
    pw: String
});