const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;
//const config = require("./server/config/key.js")

app.use(express.static(path.join(__dirname, "./client/build")));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/post", require("./server/Router/post.js"));
app.use("/api/user", require("./server/Router/user.js"));

app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Example app listening on port ${port}`);
    console.log("Connecting MongoDB...");
  })
  .catch((err) => {
    console.log(`${err}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})