const express = require('express')
const router = express.Router()
const EnsController=require("../Controllers/EnseignantController");
router.get('/GetProfDetail/:id_user', EnsController.getDetailP);
router.get('/GetProfList/:id_user', EnsController.getList);
router.get('/GetAllProfs',EnsController.getAllEns);
module.exports=router;  