const express = require("express");
const app = express();

const User = require("../models/User");

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().exec();

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("/:_id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).exec();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.put("/:_id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...req.body },
      },
      {
        new: true
      }
    ).exec()

    res.json(user)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.delete('/:id', async(req, res) => {
  const { id } = req.params

  try {
    await User.findOneAndDelete({ _id: id }).exec()

    res.json({ success: "user is deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app;
