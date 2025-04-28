const express = require("express");
const router = express.Router();
const { Note } = require("../models/Note");
//const { noteSchema } = require("../models/Note");

//console.log("Schema fields:", Object.keys(noteSchema.paths));

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// GET a note by ID
router.get("/:id", async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch note" });
  }
});

// POST a new note
router.post("/", async (req, res) => {
  const { code, course, teacher, grade } = req.body;
  if (!code || !course || !teacher || !grade) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingNote = await Note.findOne({ code });
    if (existingNote) {
      return res
        .status(400)
        .json({ error: "A note with this code already exists" });
    }

    const newNote = new Note({ code, course, teacher, grade });
    await newNote.save();
    res.status(201).json({
      message: "Note added successfully!",
      updatedGrades: await Note.find(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// PATCH a note by ID
router.patch("/:id", async (req, res) => {
  const noteId = req.params.id;
  const { code, course, teacher, grade } = req.body;

  if (grade !== undefined && (grade < 0 || grade > 20)) {
    return res.status(400).json({ error: "Grade must be between 0 and 20" });
  }

  try {
    const note = await Note.findById(noteId);
    if (note) {
      note.code = code || note.code;
      note.course = course || note.course;
      note.teacher = teacher || note.teacher;
      note.grade = grade || note.grade;

      await note.save();
      res.status(200).json({
        message: "Note updated successfully!",
        updatedGrades: await Note.find(),
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE a note by ID
router.delete("/:id", async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (note) {
      res.status(200).json({
        message: "Note deleted successfully!",
        updatedGrades: await Note.find(),
      });
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

// DELETE all notes
router.delete("/", async (req, res) => {
  try {
    await Note.deleteMany();
    res.status(200).json({
      message: "All notes deleted successfully!",
      updatedGrades: await Note.find(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete all notes" });
  }
});

module.exports = router;
