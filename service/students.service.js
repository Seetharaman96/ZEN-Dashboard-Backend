import { ObjectId } from "mongodb";
import { client } from "../index.js";

export async function deleteStudentById(id) {
  return await client
    .db("ZEN")
    .collection("Student")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function updateStudentById(id, data) {
  return await client
    .db("ZEN")
    .collection("Student")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function createStudent(data) {
  return await client.db("ZEN").collection("Student").insertMany(data);
}
export async function getStudentsById(id) {
  return await client
    .db("ZEN")
    .collection("Student")
    .findOne({ _id: new ObjectId(id) });
}
export async function getStudents() {
  return await client
    .db("ZEN")
    .collection("Student")
    .find({})
    .toArray();
}
