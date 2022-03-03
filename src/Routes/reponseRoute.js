const express = require('express')
const router = express.Router()
const reponseController=require("../Controllers/reponseController");

//EDIT reponse
router.put('/updateReponse/:idReponse',reponseController.put);
//DELETE reponse
router.delete('/delete/:idReponse', reponseController.delete);
//Add reponse
router.post('/AddReponse', reponseController.save);

module.exports=router;  