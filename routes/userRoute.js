const express = require("express");
const router = express.Router();
const User = require("../model/User");

/**
 * Create User Route
 * GET: http://locahost:3000/user
 */
router.post("/user", async function (req, res) {
  try {
    const userData = req.body;
    const user = await User.create(userData);
    if (user) {
      return res.json({ msg: "User Created Successfully !", user: user });
    }
    return res.json({ message: "Error" });
  } catch (error) {
    console.log(error.message, error.code);
  }
});

/**
 * Fetch Single User By Params
 * GET: http://localhost:3000/user/:id
 *
 */

router.get("/user/:id", async function (req, res) {
  //Using Where and equals
  //   const user = await User.find().where("_id").equals(req.params.id);
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.json({ msg: "No User Found" });
  }
  return res.json(user);
});

module.exports = router;
