const express = require('express')
const router = express.Router()
const AttachementsController=require("../Controllers/AttachementsController");
const AttachFilesController=require("../Controllers/AttachFilesController");

router.post('/AddAttachement', AttachementsController.save);
router.put('/EditAttachement/:id_attach', AttachementsController.put);
router.post('/uploadFiles',AttachFilesController.filesUpload.single('file'),AttachFilesController.uploadFiles);
module.exports=router;  