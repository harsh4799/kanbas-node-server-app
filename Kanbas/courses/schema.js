import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  number: String,
  courseText: String,
  startDate: Date,
  endDate: Date,
  image: String,
});

export default courseSchema;
