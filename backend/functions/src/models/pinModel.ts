import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { PinNumbers } from '../interface/pinNumbers';

const pinSchema = new Schema({
    pin: {type: String, index:true, required: true},
    email: {type: String, index:true, required: true, unique: true},
    createdAt: {type: Date, default: Date.now, expires: 300},
});

export default mongoose.model<PinNumbers>('Pin', pinSchema);