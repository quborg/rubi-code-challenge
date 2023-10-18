const router = require('express').Router();

let Project = require('../models/project');

router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req, res) => {
  const data = req.body;
  const newProject = new Project(data);
  newProject.save()
    .then(() => res.json('Project created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete').delete((req, res) => {
  Project.findByIdAndDelete(req.body._id)
    .then(project => res.json('Project deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  Project.findById(req.body._id)
    .then(project => {
      project.starting_date = Date.parse(req.body.starting_date);
      project.ending_date = Date.parse(req.body.ending_date);
      project.save()
        .then(() => res.json('Project updated !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get((req, res) => {
  Project.findById(req.body.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;