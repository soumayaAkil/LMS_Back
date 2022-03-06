const { type } = require('express/lib/response');
const matiere=require('../models/MatiereModel');
const classe=require('../models/ClasseModel');
const user=require('../models/UserModel');



  
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


        //get all matieres  
    exports.getdetailmatiere= async(req, res, next) => {
      id_mat=req.params.id_matiere;
      const reslt= await matiere.getdetailmatiere(id_mat);

      
      
      rows = reslt[0];
      console.log(rows[0].id_classe)

      const resClass= await classe.fetchById(rows[0].id_classe);

      const resEns= await user.getUser(rows[0].id_user);
      console.log(resClass);

          let matieree ={
            id_matiere:rows[0].id_matiere,
            name:rows[0].name,
            hours:rows[0].hours,
            type:rows[0].type,
            coef:rows[0].coef,
            short:rows[0].short,
            descr:rows[0].descr,
          creationDate:rows[0].creationDate,
            id_user:resEns[0],
            class:resClass[0]
          }
      
      if(rows.length !== 0)
      {
           res.json({
              succes: true,
              matiere: matieree,
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
 typee =req.body.type ;
 coef  =req.body.coef ;
 shortName  =req.body.shortname ;
  description  =req.body.descr ;
  let date_ob = new Date();
  creationDate  =date_ob;
  id_classe=req.body.id_classe;
  id_user=req.body.id_user;
  const ress= await matiere.save(namee,hours,typee,coef,shortName,description,creationDate,id_classe,id_user);
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
    //Matiere non affecter au classe
        exports.getMNAC= async(req, res, next) => {
          const reslt= await matiere.GetMatieresNAC();
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


