const express = require("express");
const router = express.Router();
const uuid = require("uuid");

let members = require("../model/Members");

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const paramsId = req.params.id;
  const found = members.some((member) => member.id === parseInt(paramsId));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(paramsId)));
  } else {
    res.status(400).json({ msg: `member with ${paramsId} not found` });
  }
});

router.post("/", (req, res) => {
  console.log("body: ", req.body);
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
  };

  members.push(newData);
  res.json(members);
});

router.put("/:id", (req, res) => {
  const paramsId = req.params.id;
  const found = members.some((member) => member.id === parseInt(paramsId));

  if (found) {
    const index = members.findIndex((k) => k.id == paramsId);
    members[index] = {
      ...members[index],
      ...req.body,
    };
    res.json(members);
  } else {
    res.status(400).json({ msg: `${paramsId} not found` });
  }
});

router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;
  const found = members.some((member) => member.id === parseInt(paramsId));

  if (found) {
    const newList = members.filter(
      (member) => member.id !== parseInt(paramsId)
    );
    members = [...newList];
    res.json(members);
  } else {
    res.status(400).json({ msg: `${paramsId} not found` });
  }
});

module.exports = router;
