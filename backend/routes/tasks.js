const router = require('express').Router();

let Task = require('../models/task');

router.route('/').get((req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const data = {
    ...req.body,
    starting_date: Date.parse(req.body.starting_date),
    ending_date: Date.parse(req.body.ending_date)
  };

  const newTask = new Task(data);
  newTask.save()
    .then(() => res.json('Task added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get((req, res) => {
  Task.findById(req.body._id)
    .then(task => res.json(task))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
  Task.findByIdAndDelete(req.body._id)
    .then(task => res.json('Task deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  Task.findById(req.body._id)
    .then(task => {
      task.starting_date = Date.parse(req.body.starting_date);
      task.ending_date = Date.parse(req.body.ending_date);
      task.save()
        .then(() => res.json('Task updated !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;