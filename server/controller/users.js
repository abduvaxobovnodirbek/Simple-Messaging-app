const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//description    Create new user
//route          POST /api/v1/users
//access         Public
exports.createUser = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(201).json({ success: true, data: user });
  }
  const new_user = await await User.create({ username });
  res.status(201).json({ success: true, data: new_user });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find().populate("message");
  if (user) {
    return res.status(200).json({ success: true, data: user });
  }
});
