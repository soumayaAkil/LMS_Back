const express = require('express')
const router = express.Router()
const EnsController=require("../Controllers/EnseignantController");
router.get('/GetProfDetail', EnsController.getDetailP);
router.get('/GetProfList', EnsController.getList);

module.exports=router;  