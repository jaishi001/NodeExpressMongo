const express = require("express");
const router = express.Router();
const User = require("../model/User");

/**
 * Create User Route
 * GET : http://locahost:3000/user
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
 * GET : http://localhost:3000/user/:id
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

/**
 * Find all users
 * GET : http://localhost:3000/user/
 *
 */

router.get("/user", async function (req, res) {
  const users = await User.find({});
  if (!users) {
    return res.json({ msg: "No Users Found" });
  }
  return res.json(users);
});

/**
 *
 * Find user by query
 * GET : http://localhost:3000/users?id=6485ba227aa9ace5003b899d
 *
 *
 */

router.get("/users", async function (req, res) {
  const id = req.query.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ msg: "No Users Found" });
  }
  return res.json(user);
});

/**
 * Delete User
 * DELETE : http://locahost:3000/user/:id
 *
 */

router.delete("/user/:id", async function (req, res) {
  const data = await User.deleteOne({ _id: req.params.id });
  if (data) {
    if (data.deletedCount == 0) {
      return res.json({
        msg: "User Already Deleted !", // can Be used in soft delete
      });
    }
    return res.json({
      msg: "User Deleted !",
      data: data,
    });
  }
  return res.json({ msg: "Unable to delete user" });
});

/**
 * Update User
 * PUT : http://localhost:3000/user/id
 */

router.put("/user/:id", async function (req, res) {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return res.json({ msg: "No User Found" });
  }
  const updateUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if (updateUser) {
    return res.json({ msg: "User Updated", updateUser });
  }
  res.json({ msg: "JPT" });
});

module.exports = router;
