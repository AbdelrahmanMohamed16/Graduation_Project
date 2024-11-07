const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const wordRouter = require("./routers/wordRouter");
const userRouter = require("./routers/userRouter");

app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // These options avoid deprecation warnings
      useUnifiedTopology: true, // Ensures compatibility with MongoDB drivers
    });
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

connectDB();

app.use(express.static("public"));
app.use(express.json());

app.use("/api/v1/Word", wordRouter);
app.use("/api/v1/Auth", userRouter);

// login => return getAssignedWords
// getWordData ID => {}
// postWordData => save

app.listen(7070, () => {
  console.log("server is waiting for requests");
});
