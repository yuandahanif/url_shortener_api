require("dotenv").config();
const express = require("express");
const urlRoutes = require("./routes/url");
const db = require("./services/db");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/:short_url", async (req, res) => {
  try {
    const short = req.params.short_url;

    if (!short) {
      return res.status(404).end("short_url is required");
    }

    const query = await db.query(
      `select * from url where short_url = ?`,
      req.params.short_url
    );

    if (query.length > 0) {
      res.redirect(query[0].full_url);
    } else {
      res.status(200).end("short_url not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).end("error on url / router");
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "ok" });
});

app.use("/url", urlRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
