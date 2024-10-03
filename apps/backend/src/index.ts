import express from "express";

const app = express();
app.get("/", (req, res) => {
  res.send("hellow world");
});

app.listen(3002, () => {
  try {
    console.log("here it is http://localhost:3002/");
  } catch (e) {
    console.log(e);
  }
});
