const express = require('express')
const router = express.Router()
const ClasseController=require("../Controllers/ClasseController");
router.get('/GetAllClasses', ClasseController.getAllClasses);
router.put('/UpdateClasse/:id_classe', ClasseController.update);
router.post('/PostClasse', ClasseController.create);
router.delete('/DeleteClasse/:id_classe', ClasseController.delete);
router.delete('/getClassetoedit/:id_classe', ClasseController.getClasseById);
module.exports=router;  