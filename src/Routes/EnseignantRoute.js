const express = require('express')
const router = express.Router()
const ClasseController=require("../Controllers/ClasseController");
router.get('/GetProfDetail/:id_user', ClasseController.getDetailP);
router.get('/GetProfList/:id_user', ClasseController.getList);

module.exports=router;  