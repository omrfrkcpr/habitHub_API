"use strict";

const router = require("express").Router();
const {
  create,
  list,
  read,
  update,
  destroy,
} = require("../controllers/tagController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/").all(authMiddleware).get(list).post(create);
router.route("/:id").all(authMiddleware).get(read).put(update).delete(destroy);

module.exports = router;
