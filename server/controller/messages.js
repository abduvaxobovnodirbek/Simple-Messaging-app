const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Message = require("../models/Message");
const User = require("../models/User");

//description    Create new message
//route          POST /api/v1/messages/:
//access         Public
exports.createMessage = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  req.body.user = username;

  const FoundUser = await User.findOne({ username });

  if (!FoundUser) {
    return next(
      new ErrorResponse(`There is no user found with '${username}'`, 403)
    );
  }

  const newMessage = await Message.create(req.body);

  res.status(200).json({ success: true, data: newMessage });
});
