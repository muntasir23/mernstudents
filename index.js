import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Student from "./models/Student.js";
import Allumni from "./models/Allumni.js";
import studentsRoute from "./routes/students.js";
import allumniRoute from "./routes/allumni.js";



const app = express();
dotenv.config();
app.use(cors());


//DATABASE CONNECTION
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
};



//ENTRY POINT
app.get("/", (req, res) => {
  res.send("Hello world");
});




//MIDDLEWARE
app.use(express.json());

app.use("/api/students", studentsRoute);

app.use("/api/allumni", allumniRoute);


//FOR PAGINATION AND SEARCH FILTER
app.get("/paginated", async (req, res) => {
  const { name, cata, session, page = 1, pageSize = 2 } = req.query;

  let results = await Student.find({});

  if (name) {
    results = results.filter((item) =>
      item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
  if (cata) {
    results = results.filter((item) => item.cata === cata);
  }
  if (session) {
    results = results.filter((item) => item.session === session);
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  const paginatedResult = results.slice(startIndex, endIndex);

  res.status(200).json({
    totalItem: results.length,
    totaPage: Math.ceil(results.length / pageSize),
    currentPage: parseInt(page),
    pageSize: parseInt(pageSize),
    rows: paginatedResult,
  });
});


// PAGINATED FOR ALLUMNI

app.get("/paginatedAllumni", async (req, res) => {
  const { name, phone, session, page = 1, pageSize = 2 } = req.query;

  let results = await Allumni.find({});

  if (name) {
    results = results.filter((item) =>
      item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
  if (phone) {
    results = results.filter((item) => item.phone === phone);
  }
  if (session) {
    results = results.filter((item) => item.session === session);
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  const paginatedResult = results.slice(startIndex, endIndex);

  res.status(200).json({
    totalItem: results.length,
    totaPage: Math.ceil(results.length / pageSize),
    currentPage: parseInt(page),
    pageSize: parseInt(pageSize),
    rows: paginatedResult,
  });
});


//app listen
app.listen(8800, () => {
  connect();
  console.log("Connected to backend");
});
