const mongoose = require("mongoose");
/*const dbURI = "mongodb://localhost:27017/";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("MongoDB connection error:", err);
    process.exit(1);
  });
*/

mongoose.connect("mongodb://localhost:27017/notesDB");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB through Mongoose");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

const express = require("express");
const cors = require("cors");
const notesRouter = require("./controllers/notes");

const app = express();
const port = 3000;

app.use((req, res, next) => {
  const now = new Date();
  console.log(
    `[${now.toISOString()}] ${req.method} request received at ${req.url}`
  );
  next();
});

app.use(express.json());
app.use(cors());

app.use("/notes", notesRouter);

app.listen(port, () => {
  //console.log(`Server is running at http://localhost:${port}`);
  console.log("App Name: Express Learning App | Developer: Gabriela");
});
