const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const FunctionalWordModel = require("../Models/functionalWordModel");
// const { checkAuth } = require("../controllers/checkAuth");

// router.use(checkAuth);

// get request for funtional word using ID
router.get("/:ID", async (req, res) => {
  try {
    const functionalWord = await FunctionalWordModel.findById(req.params.ID);
    if (!functionalWord) {
      return res.status(404).json({
        message: "Functional word not found",
      });
    }
    res.json({
      data: functionalWord,
    });
  } catch (error) {
    res.json({
      err: error,
    });
  }
});

//get request that loads the user with his assigned words, functional words
router.get("/", async (req, res) => {
  try {
    const user = await userModel.findOne({ code: req.user }).populate({
      path: "functionalWords",
      select: "text",
      match: { state: "قيد التحرير" },
    });
    console.log(user);
    res.json({
      assigned_functional_words: user.functionalWords,
      code: user.code,
      committee: user.committee,
      type: user.type,
      time_spent: user.time_spent,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
});

//creating new word, functional word

router.post("/", async (req, res) => {
  try {
    const functionalWord = await new FunctionalWordModel(req.body);
    await functionalWord.save();
    res.json({
      data: functionalWord,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

//updating an existing word using ID
router.put("/:ID", async (req, res) => {
  try {
    const functionalWord = await FunctionalWordModel.findByIdAndUpdate(
      req.params.ID,
      req.body,
      { new: true }
    );

    if (!functionalWord) {
      return res.status(404).json({
        error: "FunctionalWord not found",
      });
    }

    res.json({
      data: functionalWord,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

module.exports = router;
