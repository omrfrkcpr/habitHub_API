"use strict";

const router = require("express").Router();
const {
  register,
  login,
  refresh,
  reset,
  forgot,
  verifyEmail,
  logout,
  socialLogin,
} = require("../controllers/authController");
const passport = require("passport");

// BASE_URL: /auth

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.get("/logout", logout);

router.post("/refresh", refresh);
router.post("/forgot", forgot);
router.post("/reset/:token", reset);

// Twitter authentication routes
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: "http://localhost:3000/contract",
    failureRedirect: "http://localhost:3000/signin",
  })
);

// Facebook authentication routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/contract",
    failureRedirect: "http://localhost:3000/signin",
  })
);

// Google authentication routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: true,
    successRedirect: "http://localhost:3000/contract",
    failureRedirect: "http://localhost:3000/signin",
  })
);

// // GitHub authentication routes
// router.get("/github", passport.authenticate("github"));
// router.get("/github/callback", (req, res, next) => {
//   passport.authenticate("github", (err, user, info) => {
//     if (err || !user) {
//       throw new CustomError("Authentication failed!", 400);
//     }

//     req.login(user, (loginErr) => {
//       if (loginErr) {
//         throw new CustomError("Authentication failed!", 400);
//       }

//       // Access ve Refresh Token'ları response ile döndür
//       res.status(200).json({
//         error: false,
//         message: "You are successfully logged in!",
//         bearer: {
//           access: info.accessToken,
//           refresh: info.refreshToken,
//         },
//         user,
//       });

//       // Kullanıcıyı frontend'de yönlendirme işlemini de yapabilirsiniz
//       // res.redirect("http://localhost:3000/signin");
//     });
//   })(req, res, next);
// });

// GitHub authentication routes
router.get("/github", passport.authenticate("github"));
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/signin",
    failureRedirect: "http://localhost:3000/signin",
  })
);

module.exports = router;
