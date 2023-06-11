import express from "express";
import { getStudents, getStudentsById, createStudent, updateStudentById, deleteStudentById } from "../service/students.service.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, async function (req, res) {
  const result = await getStudents();
  res.send(result);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  console.log(id);
  const result = await getStudentsById(id);
  res.send(result);
});

router.post("/", async function (req, res) {
  const data = req.body;
  const result = await createStudent(data);
  res.send(result);
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const result = await updateStudentById(id, data);
  res.send(result);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const result = await deleteStudentById(id);
  res.send(result);
});

export default router;