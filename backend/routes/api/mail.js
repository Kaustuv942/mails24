const express = require('express');
const mailRouter = express.Router();
const mailController = require('../../controllers/mail');

mailRouter.post('/compose', mailController.compose);
mailRouter.get('/mailbody/:uuid', mailController.mailbody);
mailRouter.get('/history/:author', mailController.history);

module.exports=mailRouter;