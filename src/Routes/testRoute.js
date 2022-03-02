const express = require('express')
const router = express.Router()
const testController=require("../Controllers/testController");

router.delete('/DeleteTest/:idTest', testController.delete);
module.exports=router;  