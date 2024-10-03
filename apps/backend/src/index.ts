import express from "express";
import router from "./problems.js"

const problems = router;

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("hellow world");
});
app.use("/problem", problems)


app.listen(3002, () => {
  try {
    console.log("here it is http://localhost:3002/");
  } catch (e) {
    console.log(e);
  }
});
