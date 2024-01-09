import express from "express";

import Allumni from "../models/Allumni.js";

const router = express.Router();

//CREATE
router.post("/", async (req, res) => {
  const newAllumni = new Allumni(req.body);
  try {
    const savedAllumni = await newAllumni.save();
    res.status(200).json(savedAllumni);
  } catch (err) {
    res.status(500).json(err);
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedAllumni = await Allumni.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAllumni);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Allumni.findByIdAndDelete(req.params.id);
    res.status(200).json("Data has been removed");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ONE
router.get("/:id", async (req, res) => {
  try {
    const allumni = await Allumni.findById(req.params.id);
    res.status(200).json(allumni);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL
router.get("/", async (req, res) => {
  try {
    const allumnis = await Allumni.find();
    res.status(200).json(allumnis);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
