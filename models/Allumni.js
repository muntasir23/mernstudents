import mongoose from "mongoose";

const AllumniSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  companyName: {
    type: String
  },
  designation: {
    type: String
  },
  session: {
    type: String,
    require: true,
  }
});

export default mongoose.model("Allumni", AllumniSchema);
