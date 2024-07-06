"use strict";

const router = require("express").Router();
const {
  listUsers,
  readUser,
  updateUser,
  createUser,
  destroyUser,
} = require("../controllers/userController");
const { isAdmin, isLogin } = require("../middlewares/permissions");

// BASE_URL: /users

router.route("/").get(isAdmin, listUsers).post(createUser);
router
  .route("/:id")
  .all(isLogin)
  .get(readUser)
  .put(updateUser)
  .delete(destroyUser);

module.exports = router;
