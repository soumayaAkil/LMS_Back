const express = require('express')
const router = express.Router()
const ClasseController=require("../Controllers/ClasseController");
router.get('/GetAllClasses', ClasseController.getAllClasses);
router.put('/UpdateClasse', ClasseController.update);
router.post('/PostClasse', ClasseController.create);
router.delete('/DeleteClasse', ClasseController.delete);
router.get('/getClassetoedit/:id_classe', ClasseController.getClasseById);
module.exports=router;  