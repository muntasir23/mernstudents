import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  reg: {
    type: String,
    require: true,
  },
  roll: {
    type: String,
    require: true,
  },
  session: {
    type: String,
    require: true,
  },
  cata: {
    type: String,
    require: true,
  },
  attendence: {
    type: Number
  },
  days: {
    type: Number
  }
});

export default mongoose.model("Student", StudentSchema);
