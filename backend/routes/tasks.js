const router = require('express').Router();

let Task = require('../models/task');
let Project = require('../models/project');

router.route('/').get((req, res) => {
  Task.aggregate([
    {
      $match: {
        _id: { $exists: true }
      }
    },
    {
      $lookup: {
        from: 'projects',
        localField: "project",
        foreignField: "_id",
        as: "projectObj"
      }
    },
    {
      $project: {
        label: 1,
        description: 1,
        projectLabel: {$first: '$projectObj.label'},
        project: {$first: '$projectObj'},
        start_date: 1,
        end_date: 1,
        createdAt: 1,
        updatedAt: 1,
      }
    }
  ])
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const data = req.body;
  const newTask = new Task(data);
  newTask.save()
    .then(() => res.json(newTask))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get((req, res) => {
  Task.findById(req.body._id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
  Task.findByIdAndDelete(req.body._id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  Task.findById(req.body._id)
    .then(task => {
      task.label = req.body.label;
      task.description = req.body.description;
      task.project = req.body.project;
      task.start_date = req.body.start_date;
      task.end_date = req.body.end_date;
      task.save()
        .then(() => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;