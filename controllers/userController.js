const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { access } = require("fs");

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all field mendetory..");
  }
  const userAwailable = await User.findOne({ email });
  if (userAwailable) {
    res.status(400);
    throw new Error("this email address in already in use ");
  }

  //hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  console.log("hashedpassword :- ", hashedpassword);
  const user = await User.create({
    username,
    email,
    password: hashedpassword,
  });
  console.log(`created user is ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(404);
    throw new Error("user data is not valid");
  }

  res.json({ message: "register by user.." });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all field mendetory..");
  }
  const user =await User.findOne({ email });
//   console.log(user, "======");
//   console.log(user && (await bcrypt.compare(password, user.password)));
  // compair password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          _id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "60d" }
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401)
    throw new Error ('email or password is not valid ')
  }
});

module.exports = {
    currentUser,
  userRegister,
  userLogin,
};
