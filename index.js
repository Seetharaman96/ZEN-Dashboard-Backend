import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const app = express();
const PORT = 4000;

// const MONGO_URL = "mongodb://127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");

app.use(express.json());

app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/studentDatas", async function (req, res) {
  const result = await client
    .db("ZEN")
    .collection("Student")
    .find({})
    .toArray();
  res.send(result);
});

app.get("/studentDatas/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  const result = await client
    .db("ZEN")
    .collection("Student")
    .findOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.post("/studentDatas", async function (req, res) {
  const data = req.body;
  const result = await client.db("ZEN").collection("Student").insertMany(data);
  res.send(result);
});

app.put("/studentDatas/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const result = await client
    .db("ZEN")
    .collection("Student")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  res.send(result);
});

app.delete("/studentDatas/:id", async function (req, res) {
  const { id } = req.params;
  const result = await client
    .db("ZEN")
    .collection("Student")
    .deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});

app.listen(PORT, () => {
  console.log(`The server started in: ${PORT} ✨✨`);
});
