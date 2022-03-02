const express = require('express')
const router = express.Router()
const AttachementsController=require("../Controllers/AttachementsController");

router.post('/AddAttachement', AttachementsController.save);
router.put('/EditAttachement/:id_attach', AttachementsController.put);
module.exports=router;  