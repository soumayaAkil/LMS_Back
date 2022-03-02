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
      id_matiere=req.params.id_matiere;
    const resultat = await matiere.delete(id_matiere);
    res.status(200).json(resultat);
  
      res.json('true')
     
    }catch(err) {
      res.status(500).json('false');
        }
     
    };