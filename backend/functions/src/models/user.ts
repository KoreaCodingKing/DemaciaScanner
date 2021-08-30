import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface User {
    id: string,
    lolid: string,
    pw: string,
    created: Date
};

const userSchema = new Schema({
    id: {type: String, index:true, required: true, unique: true},
    lolid: {type: String},
    pw: {type: String, required: true},
    created: {type: Date}
});


// https://mongoosejs.com/docs/middleware.html#error-handling-middleware
userSchema.post('save', (err: any, doc: any, next: any) => {
    if (err.name === 'MongoError' && err.code === 11000) {
        next(new Error('There was a duplicate key error'));
      } else {
        next(new Error('unknown error'));
      }
});

export default mongoose.model<User>('User', userSchema);