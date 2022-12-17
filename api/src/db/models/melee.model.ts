import { Schema, model } from "mongoose";

const dataSchema: Schema = new Schema({
  id: { type: String },
  startAt: { type: Date, default: null },
  endAt: { type: Date, default: null },
  commentory: { type: String, default: null },
  createdAt: { type: Number, default: null },
  updatedAt: { type: Number, default: null },
  author: { type: Object, default: null },
  editor: { type: Array, default: null },
  user: { type: String, default: "" },
  isReserved: { type: Boolean, default: false },
  tags: { type: Array, default: [] },
  promo : { type: String, default: "" },
});

export default model("melee_data", dataSchema);
