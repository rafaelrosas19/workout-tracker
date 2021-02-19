const router = require("express").Router();

const Workout = require("../models/workout.js");

// router.get("/api/workouts", (req, res) => {
//   Workout.find({})
//     .then((workout) => {
//       res.json(workout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercise.duration",
        },
      },
    },
  ])
    .then((workoutData) => {
      res.json(workoutData);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.param.id,
    { $push: { exercises: req.body } },
    { new: true, runValidators: true }
  )
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts/", (req, res) => {
  Workout.create({})
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.get("/api/workouts/range", (req, res) => {
//   Workout.find({})
//     .then((workout) => {
//       res.json(workout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
