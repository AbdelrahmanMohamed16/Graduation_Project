const express = require("express");
const router = express.Router();
const userModel = require("../Models/userModel");
const { getToken, checkAuth } = require("../controllers/checkAuth");

router.post("/login", async (req, res) => {
  try {
    const { code, password } = req.body;
    if (!code || !password) {
      throw err();
    }
    let user = await userModel.findOne({ code }).populate({
      path: "words",
      select:
        "text state  semantic_info.index semantic_info.meaning.text semantic_info.meaning.completed semantic_info._id",
    });

    if (!user) {
      throw err();
    }
    // if (!user.comparePassword(password)) {
    if (password != user.password) {
      throw err();
    }

    let token = getToken(code);

    res.json({
      token,
      assigned_words: user.words,
      code: user.code,
      committee: user.committee,
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "اسم المستخدم او كلمة المرور غير صحيحة",
    });
  }
});

router.use(checkAuth);

router.patch("/time", async (req, res) => {
  try {
    time_spent = req.body.time || 0;
    const user = await userModel.findOneAndUpdate(
      { code: req.user },
      {
        $inc: { time_spent: time_spent },
      }
    );
    res.json({
      message: "Time Updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
});

module.exports = router;