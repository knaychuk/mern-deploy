const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

// get single
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({err: 'No result found'});
    }

    const workout = await Workout.findById(id);

    if (!workout) {
     return res.status(404).json({err: "No result found"})
    }

    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

// create new
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({title, load, reps});
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

// delete existing
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({err: 'No result found'});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if (!workout) {
      return res.status(404).json({err: 'No result found'});
    }

    res.status(200).json(workout);

  } catch (err) {
    res.status(400).json({err: err.message});
  }
}

// update existing
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({err: "No result found"});
    }

    const updatedWorkout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    if (!updatedWorkout) {
      return res.status(404).json({err: "No result found"});
    }

    res.status(200).json(updatedWorkout);

  } catch (err) {
    res.status(400).json({err: err.message});
  }
}

const createWorkouts = async (req, res) => {
  const { workouts } = req.body;

  const processedWorkouts = workouts.map((workout) => {
    if (workout.title === null || workout.title === undefined) {
      workout.title = "default"
    }
  
    if (workout.reps === null || workout.reps === undefined) {
      workout.reps = 0
    }
  
    if (workout.load === null || workout.load === undefined) {
      workout.load = 0
    }

    return workout
  })


  try {
    const createdWorkouts = await Workout.insertMany(processedWorkouts);
    res.status(200).json(createdWorkouts);
  } catch (err) {
    res.status(400).json({err: err.message})
  }
}

module.exports = { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout, createWorkouts }