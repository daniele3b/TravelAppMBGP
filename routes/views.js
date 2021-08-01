const express = require("express");
const router = express.Router();
const config = require("config");
require("dotenv").config();
const path = require("path");


router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "login.html"));
  });

  router.get("/homepage", async (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "homepage.html"));
  });

  module.exports = router;