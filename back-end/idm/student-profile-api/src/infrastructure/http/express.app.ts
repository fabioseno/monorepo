import ExpressAdapter from '../../application/adapter/express.adapter';
import StudentProfileController from '../../application/controllers/student-profile.controller';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/profiles', ExpressAdapter.getStudentProfile(StudentProfileController.getStudentProfile));
app.post('/profiles', ExpressAdapter.createStudentProfile(StudentProfileController.createStudentProfile));

console.log(`Listening on port ${port}`)
app.listen(port);