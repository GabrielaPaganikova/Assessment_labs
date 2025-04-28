const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    teacher: { type: String, required: true },
    grade: { type: Number, required: true, min: 0, max: 20 },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note, noteSchema };
