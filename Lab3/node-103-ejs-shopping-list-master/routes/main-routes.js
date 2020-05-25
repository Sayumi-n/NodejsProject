const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// const data = [];

if (!fs.existsSync(path.join(__dirname, "../", "notes.js"))) {
  const output = [];
  fs.writeFileSync("notes.json", JSON.stringify(output));
}
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../", "notes.json"))
);

router.get("/", (req, res, next) => {
  res.render("index", { notes: data });
});

//remove item
router.use("/remove/:id", (req, res, next) => {
  const id = req.params.id;
  const index = data.findIndex((d) => d.id == id);
  data.splice(index, 1);
  fs.writeFile("notes.json", JSON.stringify(data, null, 2), () => {
    res.status(302).redirect("/");
  });
});

//item checkout
router.use("/done/:id", (req, res, next) => {
  const id = req.params.id;
  const index = data.findIndex((d) => d.id == id);
  data[index] = {
    ...data[index],
    done: !data[index].done,
  };
  fs.writeFile("notes.json", JSON.stringify(data, null, 2), () => {
    res.status(302).redirect("/");
  });
});

//new item
router.post("/note", (req, res, next) => {
  data.push({
    id: Math.random(),
    note: req.body.note,
    done: false,
  });
  fs.writeFile("notes.json", JSON.stringify(data, null, 2), () => {
    res.status(302).redirect("/");
  });
});

module.exports = router;
