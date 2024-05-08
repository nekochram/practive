const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json())

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  next();
});

app.post("/close",urlencodedParser,(req, res)=>{
  const { way } = req.body;
  console.log(way)
  res.end()
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
