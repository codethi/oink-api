import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

//Conexão com o mongodb
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  console.log(err.message);
}

export const db = mongoClient.db("oinkdb");