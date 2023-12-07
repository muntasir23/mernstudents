import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const savedStudents = await newStudent.save();
    res.status(200).json(savedStudents);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedStudents = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedStudents);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Data has been removed");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ONE
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
