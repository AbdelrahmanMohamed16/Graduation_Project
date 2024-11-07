const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const wordRouter = require("./routers/wordRouter");
const userRouter = require("./routers/userRouter");

app.use(cors());

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
