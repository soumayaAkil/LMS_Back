const express = require('express')
const router = express.Router()
const testController=require("../Controllers/testController");

router.delete('/DeleteTest/:idTest', testController.delete);
//edit test
router.put('/UpdateTest/:idTest',testController.put);
//detail test
router.get('/detailstest/:idTest',testController.testDetailsc);
 //list test by id chapitre
router.get('/allTestChap/:id_chapitre', testController.getTestByChapitre);
//Add Test 
router.post('/AddTest', testController.save);
//Publish test
router.put('/publishtest/:idTest',testController.publishupdate);
//submit test
router.post('/submitTest',testController.submitTest);
module.exports=router;  