const express = require("express");
const router = express.Router();
const verbModel = require("../Models/verbModel");
const userModel = require("../Models/userModel");

// const { checkAuth } = require("../controllers/checkAuth");

// router.use(checkAuth);

router.get("/:ID", async (req, res) => {
  try {
    let verb = await verbModel.findById(req.params.ID).exec();
    res.json({
      data: verb,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await userModel.findOne({ code: req.user }).populate({
      path: "verbs",
      select: "text",
      match: { state: "قيد التحرير" },
    });

    res.json({
      assigned_verbs: user.verbs,
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

router.post("/", async (req, res) => {
  try {
    const Verb = await new verbModel(req.body);
    await Verb.save();
    res.json({
      data: Verb,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const Verb = await verbModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      data: Verb,
    });
  } catch (err) {
    res.json({
      error: err,
    });
  }
});

module.exports = router;
