const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Rohanisagoodboy";

//Create a new user
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are error, send bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Check if the user with this email exits
    try {
      let user = await User.findOne({ email: req.body.email });
      let success = false;
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry, user with this email exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      const decode = jwt.decode(authtoken);
      // res.status(200).json(user);
      res.status(200).json({ success: true, authtoken, decode, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some error occurred");
    }
  }
);

//Authenticating a User
router.post(
  "/login",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are error, send bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        const success = false;
        return res
          .status(400)
          .json({ success, errors: "Please login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        const success = false;
        return res
          .status(400)
          .json({ success, errors: "Please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
      const success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      const decode = jwt.decode(authtoken);
      res.status(200).json({ success, authtoken, decode, user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Get logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
