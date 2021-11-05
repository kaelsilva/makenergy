import * as express from "express";
import User from "../models/user";
import * as bcrypt from "bcrypt";

const router = express.Router();
const rounds = 10;

import Middleware from "../middleware";

const middleware = new Middleware();

const jwt = require("jsonwebtoken");
const tokenSecret = process.env.TOKENSECRET;

router.get("/jwt-test", middleware.verify, (req: any, res: any) => {
  res.status(200).json(req.user);
});

router.post("/login", async (req, res) => {
  await User.findOne({ email: req.body.email }).then((user: any) => {
    if (!user)
      res.status(404).json({ error: "No user found with this e-mail." });
    else {
      bcrypt.compare(
        req.body.password,
        user.password,
        (error: any, match: any) => {
          if (error) res.status(500).json(error);
          else if (match) res.status(200).json({ token: generateToken(user) });
          else res.status(403).json({ error: "Login error" });
        }
      );
    }
  });
});

router.post("/signup", async (req, res) => {
  await bcrypt.hash(req.body.password, rounds, (error: any, hash: any) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const newUser = User({ email: req.body.email, password: hash });
      newUser
        .save()
        .then((user: any) => {
          res.status(200).json({ token: generateToken(user) });
        })
        .catch((error: any) => {
          res.status(500).json(error);
        });
    }
  });
});

function generateToken(user: any) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

module.exports = router;
