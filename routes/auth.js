const express = require("express");

const {
  register,
  login,
  current,
  logout,
  updateAvatar,
  addUserData,
  getUserParams
} = require("../controllers/auth");

const { validateBody, authenticate, upload } = require("../middlewares");

const { schemas } = require("../models/user");

const router = express.Router();

//signup
router.post("/register", validateBody(schemas.registerSchema), register);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, current);

router.post("/logout", authenticate, logout);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.addUserDataSchema),
  addUserData
);

router.patch(
  "/params",
  authenticate,
  validateBody(schemas.addUserParamsSchema),
  addUserData
);

router.get("/getuser", authenticate, getUserParams);

module.exports = router;
