const express = require('express');
const jobRouter = express.Router();
const jobController = require('../../controllers/job');


jobRouter.get('/scheduled/:author', jobController.scheduled);
jobRouter.post('/delete/:taskId', jobController.delete);


module.exports=jobRouter;
