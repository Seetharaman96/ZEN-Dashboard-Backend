import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function createUser(data) {
  return await client.db("ZEN").collection("User").insertOne(data);
}

export async function getUserByName(userName) {
  return await client.db("ZEN").collection("User").findOne({userName: userName});
}