import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { UserData } from '../interface/user';

const userSchema = new Schema({
    id: {type: String, index:true, required: true, unique: true},
    email: {type: String, index:true, required: true, unique: true},
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

export default mongoose.model<UserData>('User', userSchema);