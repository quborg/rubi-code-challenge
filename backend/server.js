require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.LOCAL_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb database connection established successfully !!");
})

const projectsRouter = require('./routes/projects');
const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(express.json());

app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});