import { Schema, model } from 'mongoose';

const dataSchema: Schema = new Schema({
    name: { type: String, default: "students" },
    students: { type: Array },
    lastEdit: { type: Number },
});

export default model("students_cache_data", dataSchema);