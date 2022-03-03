const matiere=require('../models/MatiereModel');



  
 // delete matiere
 exports.delete = async(req, res, next) => {
    try {
      id_matiere=req.query.id_matiere;
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
    //get all matieres  
    exports.get= async(req, res, next) => {
      const reslt= await matiere.detailMatiere();
      rows = reslt[0];
      if(rows.length !== 0)
      {
           res.json({
              succes: true,
              test: rows,
          });
  
      } else 
       {
          res.json({
              succes: false,
              message: 'aucune matiere',
          });
       }
      
 
      };
 //add matiere
 exports.save= async (req,res,next)=>{
  namee =req.body.name;
 
  hours  =req.body.hours ;
 type =req.body.type ;
 coef  =req.body.coef ;
 shortName  =req.body.shortname ;
  description  =req.body.descr ;
  let date_ob = new Date();
  creationDate  =date_ob;
  id_classe=req.body.id_classe;
  const ress= await matiere.save(namee,hours,type,coef,shortName,description,creationDate,id_classe);
  rows = ress[0];
  console.log("rowss ",rows)
  if(rows.length !== 0)
  {
      res.json({
          succes:true,
          message: 'ajouter avec succès',
               })  

  } else 
   {
      res.json({
          succes: false,
          message: 'erreur lors de l ajout ',
      });
   }
  }


