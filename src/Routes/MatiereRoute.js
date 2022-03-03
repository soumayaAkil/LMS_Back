const express = require('express');
const router = express.Router();
const MatController=require("../Controllers/MatiereController");
router.delete('/DeleteMatiere', MatController.delete);
router.put('/EditMatiere', MatController.update);
router.get('/getAllM',MatController.get);
router.post('/AddMatiere',MatController.save);
module.exports=router;  

/*router.get('/GetAllClasses', ClasseController.getAllClasses);

router.post('/PostClasse', ClasseController.create);
router.delete('/DeleteMatiere', MatController.delete);
router.delete('/getClassetoedit/:id_classe', ClasseController.getClasseById);
*/