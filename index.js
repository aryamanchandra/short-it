const express = require("express");
const connectDB = require("./config/db");

const app = express();
const Url = require("./models/Url");

// Connect to database
connectDB();

app.use(express.json());

// Define Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  const shortUrls = await Url.find();
  res.render("index", { shortUrls });
});

app.post("/api/url/shorten", async (req, res) => {
  await Url.create({ longUrl: req.body.fullUrl });

  res.redirect("/");
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
