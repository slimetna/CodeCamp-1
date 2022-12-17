import { Schema, model } from "mongoose";

const dataSchema: Schema = new Schema({
  login: { type: String },
  melee: { type: Object },
});

export default model("last_melee_data_cache", dataSchema);
