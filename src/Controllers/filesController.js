const multer = require('multer');
const path = require('path');
const User = require('../Models/UserModel');
//const OffreAchat = require('../Models/offreAchat');
//const OffreVente = require('../Models/offreVente');
const fs = require('fs')


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
    cb(null, Date.now() + file.originalname)
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
    let user = await User.findById(req.user._id);
    let fileSize = req.file.size;
    let file = {};
    file['name'] = req.file.filename;
    if (fileSize < 1024) {
      file['size'] = fileSize + ' B';
    } else if (fileSize < 1048576 && fileSize >= 1024) {
      file['size'] = (fileSize / 1024).toFixed(1) + ' KB';
    } else if (fileSize >= 1048576) {
      file['size'] = (fileSize / 1048576).toFixed(1) + ' MB';
    }
    let fileIndex = user.files.findIndex(x => x.name == file.name);
    if (fileIndex > -1) {
      user.files.splice(fileIndex, 1);
    }
    user.files.unshift(file);
    await user.save();
    res.status(200).send(user.files.map(x => {
      x.name = x.name.slice(24);
      return x;
    }));
  }
  else {
    res.status(400).send('Error');
  }
};

//save uploaded annonce files to db
exports.uploadAnnonceFiles= async function(req, res) {
  if (req.file) {
    let annonce;
    if(req.body.annonceType=='sell'){
      annonce = await OffreVente.findById(req.body.annonceId);
    }
    else{
      annonce = await OffreAchat.findById(req.body.annonceId);
    }

    let fileSize = req.file.size;
    let file = {};
    file['name'] = req.file.filename;
    if (fileSize < 1024) {
      file['size'] = fileSize + ' B';
    } else if (fileSize < 1048576 && fileSize >= 1024) {
      file['size'] = (fileSize / 1024).toFixed(1) + ' KB';
    } else if (fileSize >= 1048576) {
      file['size'] = (fileSize / 1048576).toFixed(1) + ' MB';
    } 
    let fileIndex = annonce.docTelecharger.findIndex(x => x.name == file.name);

    if (fileIndex > -1) {
      let existingFile = annonce.docTelecharger[fileIndex];
      existingFile.CreationDate = new Date();
      existingFile.size = file.size;
    } else {
      annonce.docTelecharger.unshift(file);
    }
    await annonce.save();
    res.status(200).send(annonce.docTelecharger.map(x => {
      x.name = x.name.slice(24);
      return x;
    }));
  }
  else {
    res.status(400).send('Error');
  }
};


//save uploaded images to db
exports.uploadAllUserPics = async function (req, res) {
  if (Object.entries(req.files).length !== 0) {
    userFile = Object.keys(req.files).find(x => x == 'userPic');
    societeFile = Object.keys(req.files).find(x => x == 'societePic');

    if (typeof userFile != 'undefined') {
      await User.findOneAndUpdate(
        { id: req.body.user },
        {
          photoProfile: req.files['userPic'][0].filename
        });
    }
    if (typeof societeFile != 'undefined') {
      await User.findOneAndUpdate(
        { id: req.body.user },
        {
          logoSociete: req.files['societePic'][0].filename
        });
    }
  }
  res.status(200).send('Uploaded');
};


exports.deleteFiles = async function (req, res) {
  let file = JSON.parse(req.query.file);
  let user = await User.findById(req.user._id);
  file = user._id + file;

    let filePath = path.join(__dirname, '../uploads/files/', file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      user.files.splice(user.files.findIndex(x => x.name == file), 1);
    await user.save();
    res.status(200).send('deleted');
    
    }
    else{
      res.status(400).send('error');
    }
}

exports.deleteAnnonceFiles = async function (req, res) {
  let file = JSON.parse(req.query.file);
  let annonce;
    if(req.query.type=='sell'){
      annonce = await OffreVente.findById(req.query.id);
    }
    else{
      annonce = await OffreAchat.findById(req.query.id);
    }

  let user = await User.findById(req.user._id);
  file = user._id + file;
    let filePath = path.join(__dirname, '../uploads/files/', file);
    console.log(file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      annonce.docTelecharger.splice(user.files.findIndex(x => x.name == file), 1);
    
    await annonce.save();
    res.status(200).send('deleted');
    }
    else{
      res.status(400).send('error');
    }

}


exports.download = (req, res, next) => { 
  const filename = req.query.fileName;
  const filePath = path.join(__dirname, '../uploads/files/', req.user._id + req.query.fileName);
  const file = fs.createReadStream(filePath);
  res.setHeader('Content-Disposition', filename);
  file.pipe(res);
} 