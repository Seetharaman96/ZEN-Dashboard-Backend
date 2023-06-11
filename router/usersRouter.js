import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { createUser, getUserByName } from "../service/users.service.js";
import jwt from "jsonwebtoken"

const generateHashedPassword = async (password) => {
  const noOfRounds = 10;
  const salting = await bcrypt.genSalt(noOfRounds);
  const hashedPassword = await bcrypt.hash(password, salting);
  console.log(hashedPassword);
  return hashedPassword;
};
//signup
router.post("/signup", async function (req, res) {
  const { userName, password } = req.body;
  const userFromDb = await getUserByName(userName);
  // console.log(userFromDb)
  if (userFromDb) {
    res.status(400).send({ message: "User name already exixts" });
  } else if (password.length < 8) {
    res
      .status(400)
      .send({ message: "password should be more than 8 charcaters" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
      userName: userName,
      password: hashedPassword,
    });
    res.send(result);
  }
});
//login
router.post("/login", async function (req, res) {
  const { userName, password } = req.body;
  const userFromDb = await getUserByName(userName);
  if (!userFromDb) {
    res.status(400).send({ message: "Invalid credentials" });
  } else {
    const storedDBPassword = userFromDb.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    if (isPasswordCheck) {
      const token = jwt.sign({id: userFromDb._id}, process.env.SECRET_KEY)
      res.send({ message: "Login successful", token: token });
    } else {
      res.status(400).send({ message: "invalid credentials" });
    }
  }
});
export default router;
