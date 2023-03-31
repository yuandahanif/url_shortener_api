const express = require("express");
const router = express.Router();
const db = require("../services/db");
const { v1: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  try {
    const query = await db.query("select * from url");
    res.status(200).json(query);
  } catch (error) {
    res.status(500).end("error on url / router");
  }
});

router.post("/create", async (req, res) => {
  try {
    const body = req.body;

    if (body.full_url == null) {
      throw new Error("full_url is required.");
    }

    let random_url = null;

    if (body.short_url) {
      random_url = body.short_url;
    } else {
      random_url = uuidv4();
    }

    const query = await db.query(
      `insert into url (short_url, full_url) values ("${random_url}", "${body.full_url}")`
    );

    res.status(200).json(query);
  } catch (error) {
    res.status(500).end(`error on url CREATE router ${error}`);
  }
});

module.exports = router;
