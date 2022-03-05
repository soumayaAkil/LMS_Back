const express = require('express')
const router = express.Router()
const EtudiantController=require("../Controllers/EtudiantController");

router.get('/LoadStudentDetail', EtudiantController.loadStudentDetails);
router.get('/EtudiantNONC', EtudiantController.getEtudNonc);

module.exports=router;  