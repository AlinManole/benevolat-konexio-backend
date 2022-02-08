const express = require("express");
const Cours = require("../models/Cours");
const app = express();

app.post("/", async (req, res) => {
  try {
    const cours = await new Cours({ ...req.body });
    cours.save(async (err, cours) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json(cours);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("/", async (req, res) => {
  try {
    const cours = await Cours.find().populate("program").exec();
    res.json(cours);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("/:id_cours", async (req, res) => {
  const { id_cours } = req.params;

  try {
    const cours = await Cours.findById(id_cours)
      .populate("days")
      .populate("program")
      .exec();
    res.json(cours);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.put("/:id_cours", async (req, res) => {
  const { id_cours } = req.params;

  try {
    const cours = await Cours.findByIdAndUpdate(
      id_cours,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    ).exec();

    res.json(cours);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.delete("/:id_cours", async (req, res) => {
  const { id_cours } = req.params;
  try {
    await Cours.findByIdAndDelete(id_cours).exec();
    res.json({ success: "cour deleted !" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = app;
