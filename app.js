const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");

const myLogger = function (req, res, next) {
  console.log("LOGGED");
  //console.log(req);
  next();
};

app.use(myLogger);
app.use(express.static("public"));

/*-------Roting-------------------*/
//index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//Team-members json fetch
app.get("/team-members", (req, res) => {
  res.sendFile(path.join(__dirname, "raw/team-members.json"));
});


//app.get("/get-data", getDataRouter);

//Middleware

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
