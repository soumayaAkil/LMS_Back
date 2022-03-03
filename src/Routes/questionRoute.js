const express = require('express');
const questionController = require('../controllers/questionController');
const router = express.Router();

//get question
router.get('/:idQuestion',questionController.getQuestion);
//EDIT question
router.put('/updateQuestion/:idQuestion',questionController.put)
//DELETE question
router.delete('/delete/:idQuestion', questionController.deleteQqqq);
//Add question
router.post('/AddQuestion', questionController.save);
module.exports=router;  