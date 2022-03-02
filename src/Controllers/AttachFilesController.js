const multer = require('multer');
const path = require('path');
const fs = require('fs');
const attachments=require('../models/AttachementsModel');



// configure image  storage
var storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/images'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});


// configure files  storage
var storageFiles = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/files'))
  },
  filename: function (req, file, cb) {
    cb(null, new Date() + file.originalname)
  }
});



// configure image filter
function checkFileTypeImage(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}


//image upload middlewear  
exports.upload = multer({
  storage: storageImages,
  fileFilter: function (_req, file, cb) {
    checkFileTypeImage(file, cb);
  }
});


//files upload middlewear  
exports.filesUpload = multer({
  storage: storageFiles
});

//save uploaded images to db
exports.uploadFiles = async function (req, res) {
  if (req.file) {

    // ADD THE FILE TO THE DATABASE HERE

    const ress= await attachments.MaxIdAttach();
    rows = ress[0];
    id_attach=rows[0].id_attach;
    console.log("max id",id_attach);

    const restt=await attachments.SetFileAttach(req.file,id_attach);

    res.send("Ajouter avec succée");



    res.status(200).send();
  }
  else {
    res.status(400).send('Error');
  }
};


exports.deleteFile = async function (req, res) {
  let file = JSON.parse(req.query.file);

    let filePath = path.join(__dirname, '../uploads/files/', file);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    
    res.status(200).send('deleted');
    }
    else{
      res.status(400).send('error');
    }

}


exports.download = (req, res, next) => { 
  const filename = req.query.fileName;
  const filePath = path.join(__dirname, '../uploads/files/', req.query.fileName);
  const file = fs.createReadStream(filePath);
  res.setHeader('Content-Disposition', filename);
  file.pipe(res);
} 