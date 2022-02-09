const express = require("express");
const Cours = require("../models/Cours");
const lodash = require("lodash")
const moment = require("moment")
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
      .populate("days.users")
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

app.put("/:id_cours/:id_volunteer", async (req, res) => {
  const { id_cours, id_volunteer } = req.params

  try {
    const existingCours = await Cours.findOne({ _id: id_cours})
    const day = await existingCours.days.find(day => moment(day.date).format("YYYY-MM-DD") === moment(req.body.date).format("YYYY-MM-DD"))
    const dayIndex = await existingCours.days.findIndex(day => moment(day.date).format("YYYY-MM-DD") === moment(req.body.date).format("YYYY-MM-DD"))

    if(!day) {
      const body = {
        users: [id_volunteer],
        date: req.body.date
      }

      const updatedCourse = await Cours.findOneAndUpdate({ _id: id_cours}, { $push: { days: body } }, { new: true });
      res.json(updatedCourse)
    } else {
      if (day.users.includes(id_volunteer)) {
        existingCours.days[dayIndex].users = lodash.remove(existingCours.days[dayIndex].users, (id) => id === id_volunteer)
      } else {
        existingCours.days[dayIndex].users.push(id_volunteer)
      }

      existingCours.populate("days.users")

      existingCours.save(async (err, cours) => {
        if (err) {
            res.status(500).json({ error: err });
            return;
          }

        res.json(cours);
      })
    }
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
