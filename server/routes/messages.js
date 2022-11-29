const express = require("express");
const router = express.Router();
const { createMessage } = require("../controller/messages");

router.route("/:username").post(createMessage);

module.exports = router;
