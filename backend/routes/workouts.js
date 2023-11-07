const express = require('express');
const Workout = require('../models/workoutModel');
const { getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout, createWorkouts } = require('../controllers/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts)

//GET single workout
router.get('/:id', getWorkout)

//POST new workout
router.post('/', createWorkout)

//DELETE workout
router.delete('/:id', deleteWorkout);

//UPDATE workout
router.patch('/:id', updateWorkout);

//POST multiple workout
router.post('/create-workouts', createWorkouts)

module.exports = router;