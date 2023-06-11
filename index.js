import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { data } from "./data.js";
import studentsRouter from "./router/studentsRouter.js";
import usersRouter from "./router/usersRouter.js"
const app = express();
const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json());

app.use(cors());

app.get("/", function (req, res) {
  res.send(data);
});

app.use("/studentDatas", studentsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`The server started in: ${PORT} ✨✨`);
});
