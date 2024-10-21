import express from "express";
import problem from "./problems.js"
import submit from "./submission.js"
import test from "./internal.js"

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hellow world");
});
app.use("/problem", problem)

app.use("/submit", submit)

app.use("internal/test", test)
app.listen(3002, () => {
  try {
    console.log("here it is http://localhost:3002/");
  } catch (e) {
    console.log(e);
  }
});
