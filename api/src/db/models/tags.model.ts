import { Schema, model } from 'mongoose';

const dataSchema: Schema = new Schema({
    id: { type: String },
    name: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    users: { type: Array },
});

export default model("tags_datas", dataSchema);