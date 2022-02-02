const express = require("express");
const app = express();

const User = require("../models/User");

app.get("/volunteers", async (req, res) => {
  try {
    const users = await User.find().exec();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("/volunteers/:_id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.put("/volunteers/:_id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    ).exec();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.delete("/volunteers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await User.findOneAndDelete({ _id: id }).exec();

    res.json({ success: "user is deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await User.findById(id).exec();

    res.json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.put("admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { $in: [{ _id: id }, { role: "admin" }] },
      {
        $set: { ...req.body },
      },
      {
        new: true,
      }
    ).exec();

    user.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = app;
