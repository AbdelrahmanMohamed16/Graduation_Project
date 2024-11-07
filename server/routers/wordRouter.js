const express = require("express");
const router = express.Router();
const wordModel = require("../Models/wordModel");

router.get("/:ID", async (req, res) => {
  try {
    let word = await wordModel.findById(req.params.ID).exec();
    res.json({
      data: word,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const Word = await new wordModel(req.body);
    await Word.save();
    res.json({
      data: Word,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

module.exports = router;
