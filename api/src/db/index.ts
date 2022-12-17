import * as mongoose from 'mongoose';

const db: string = process.env.DATABASE || "mongodb://localhost:27017/etna-api";

export async function connect() {
    const returnState: any = await mongoose.connect(db);
    return returnState;
}