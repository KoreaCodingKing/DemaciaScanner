import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { PinNumbers } from '../interface/pinNumbers';

const pinSchema = new Schema({
    id: {type: String, index:true, required: true, unique: true},
    email: {type: String, index:true, required: true, unique: true},
    lolid: {type: String},
    pw: {type: String, required: true},
    created: {type: Date}
});

export default mongoose.model<PinNumbers>('Pin', pinSchema);