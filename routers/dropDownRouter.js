const express = require("express");
const router = express.Router();
const dropDownModel = require("../Models/dropDownModel");
// const { checkAuth } = require("../controllers/checkAuth");

// router.use(checkAuth);

router.get("/", async (req, res) => {
  try {
    let drops = await dropDownModel.find();

    res.json({
      data: drops,
    });
  } catch (err) {
    res,
      staus(400).json({
        status: "error",
        error: err,
      });
  }
});
router.patch("/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const { choice } = req.body;
    const drop = await dropDownModel.findOneAndUpdate(
      { name },
      {
        $push: { choices: choice },
      },
      { new: true }
    );
    res.json({
      data: drop,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      Message: err,
    });
  }
});

module.exports = router;
