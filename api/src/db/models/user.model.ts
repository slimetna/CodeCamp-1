import { Schema, model } from 'mongoose';

const dataSchema: Schema = new Schema({
    id: { type: Number },
    login: { type: String },
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    groups: { type: Array, default: null },
    logas: { type: Boolean, default: null },
    login_date: { type: Number, default: null },
    promo: { type: Number, default: null },
    img: { type: String, default: null },
});

export default model("user_log_datas", dataSchema);