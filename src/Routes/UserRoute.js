const express = require('express')
const router = express.Router()
const UserController=require("../Controllers/UserController");
const filesController=require("../Controllers/filesController");

router.get('/GetUser/:id_user', UserController.getUser);
router.post('/InvitUser', UserController.InvitUser);
router.put('/InscriUser/:id_user', UserController.InscriUser);
router.put('/CancelInvitation/:id_user', UserController.CancelInvitation);
router.post('/uploadFiles',filesController.filesUpload.single('file'),filesController.uploadFiles);

module.exports=router;