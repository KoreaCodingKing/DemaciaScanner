import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface User {
    id: string,
    lolid: string,
    pw: string,
    created: Date
};

const userSchema = new Schema({
    id: {type: String, required: true, unique: true},
    lolid: {type: String},
    pw: {type: String, required: true},
    created: {type: Date, required: true,}
});

export default mongoose.model<User>('User', userSchema);