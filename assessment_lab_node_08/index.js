const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const my_notes = [20, 10, 15, 17];

app.use(express.json());
app.use(cors());

//app.get("/", (req, res) => {
//  res.send("Hello!");
//});

app.listen(port, () => {
  //console.log(`Server is running at http://localhost:${port}`);
  console.log("App Name: Express Learning App | Developer: Gabriela");
});

//GET to return an array
app.get("/", (req, res) => {
  res.json(my_notes);
});

app.get("/notes/:position", (req, res) => {
  const position = parseInt(req.params.position);
  if (position >= 0 && position < my_notes.length) {
    res.json(my_notes[position]);
  } else {
    res.status(404).json({ error: "Position not found" });
  }
});

//POST to add a new note
app.post("/", (req, res) => {
  const input = req.body.note;
  const new_note = Number(input);

  if (!isNaN(new_note)) {
    my_notes.push(new_note);
    res.status(201).json({
      message: "Note added successfully!",
      updatedGrades: my_notes,
    });
  } else {
    res.status(400).json({ error: "Please send a valid number as 'note'." });
  }
});

//POST with parameter
app.post("/notes/:position", (req, res) => {
  const position = parseInt(req.params.position);
  const new_note = req.body.note;

  if (typeof new_note === "number") {
    if (position >= 0 && position < my_notes.length) {
      my_notes[position] = new_note;
      res.status(200).json({
        message: "Note updated successfully!",
        updatedGrades: my_notes,
      });
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } else {
    res.status(400).json({ error: "Please send a valid number as 'note'." });
  }
});

//PATCH to update a note
app.patch("/notes/:position", (req, res) => {
  const position = parseInt(req.params.position);
  const new_note = req.body.note;

  if (typeof new_note === "number") {
    if (position >= 0 && position < my_notes.length) {
      my_notes[position] = new_note;
      res.status(200).json({
        message: "Note updated successfully!",
        updatedGrades: my_notes,
      });
    } else {
      res.status(404).json({ error: "Position not found" });
    }
  } else {
    res.status(400).json({ error: "Please send a valid number as 'note'." });
  }
});

//DELETE with parameter
app.delete("/notes/:position", (req, res) => {
  const position = parseInt(req.params.position);

  if (position >= 0 && position < my_notes.length) {
    my_notes.splice(position, 1);
    res.status(200).json({
      message: "Note deleted successfully!",
      updatedGrades: my_notes,
    });
  } else {
    res.status(404).json({ error: "Position not found" });
  }
});

//DEETE all notes
app.delete("/", (req, res) => {
  my_notes.length = 0;
  res.status(200).json({
    message: "All notes deleted successfully!",
    updatedGrades: my_notes,
  });
});
