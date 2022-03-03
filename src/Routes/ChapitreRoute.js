const express = require('express')
const router = express.Router()
const ChapitreController=require("../Controllers/ChapitreController");

router.delete('/DeleteChapitre/:id_chapitre', ChapitreController.delete);
router.get('/GetDetailChapitre/:id_chapitre', ChapitreController.getDetailChapitre);
router.get('/GetChapitreByMat/:id_matiere', ChapitreController.getChapitreByMat);
router.post('/AddChapitre', ChapitreController.save);
router.put('/EditChapitre/:id_chapitre', ChapitreController.put);
module.exports=router;  