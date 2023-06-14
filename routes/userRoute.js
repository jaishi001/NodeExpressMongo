const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../util/generateToken");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../util/upload");

/**
 * Create User Route
 * POST : http://locahost:3000/user
 */
router.post("/user", upload.single("photo"), async function (req, res) {
  try {
    //Check if user already exists
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) {
      return res.json({ msg: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10); //generate salt with 10 rounds
    const userData = req.body;
    if (req.file) {
      userData.photo = req.file.path;
    }
    const hash = await bcrypt.hash(userData["password"], salt); // generate hash
    userData["password"] = hash; // replace object's plain value to hash
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
 * User Login
 * POST : http://locahost:3000/user
 */

router.post("/user/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.json({ msg: "Email and Password is required" });
  }

  //Check if user exists or not
  let isUserExists = await User.findOne({ email: email });
  if (isUserExists) {
    const hashedPassword = isUserExists["password"];
    //Compare Password Using Bcrypt.compare
    const compareHashPassword = await bcrypt.compare(password, hashedPassword);
    if (!compareHashPassword) {
      return res.json({ msg: "Either Email or Password is incorrect" });
    }
    //Generate JWT Token
    const token = await generateToken({ email, password, user: isUserExists });
    return res.json({
      token,
    });
  }
  return res.json({ msg: "User Not FOund" });
});

/**
 * Fetch Single User By Params
 * GET : http://localhost:3000/user/:id
 *
 */

//Added Authentication in route
router.get("/user/:id", verifyToken, async function (req, res) {
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

/**
 * File Upload Route
 */

router.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file, "files");
});

module.exports = router;
