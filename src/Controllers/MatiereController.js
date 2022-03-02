const { type } = require('express/lib/response');
const matiere=require('../models/MatiereModel');



  
 // delete matiere
 exports.delete = async(req, res, next) => {
    try {
      id_matiere=req.params.id_matiere;
    const resultat = await matiere.delete(id_matiere);
    
  
      res.status(200).json('true')
     
    }catch(err) {
      res.status(500).json('false');
        }
     
    };
      
 // delete matiere
 exports.update = async(req, res, next) => {
    try {
      let typee="";
      id_matiere=req.body.id_matiere;
      namee=req.body.name;
      
      shortName=req.body.shortName;
       typee=req.body.type;
      hours=req.body.hours;
     
      descr=req.body.descr;
      coef=req.body.coef;
      creationDate=req.body.creationDate;
      id_user=req.body.id_user;
      id_classe=req.body.id_classe;
      const resultat = await matiere.updateM(id_matiere,namee,shortName,typee,hours,descr,coef,creationDate,id_user,id_classe);
    res.status(200).json('true');
    
    }catch(err) {
      console.log(err)
      res.status(500).json('false');
        }
     
    };