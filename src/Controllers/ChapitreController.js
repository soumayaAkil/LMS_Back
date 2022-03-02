const chapitre=require('../models/ChapitreModel');
const attachments=require('../models/AttachementsModel');

 // delete chapitre
 exports.delete = async(req, res, next) => {
  
       try {
              id_chapitre=req.params.id_chapitre;
              console.log("id_chapitre :",id_chapitre);

              const resultat = await chapitre.delete(id_chapitre);
                console.log("resulttttttt :",resultat);
              if(resultat[0]. affectedRows == 1)
              {
                  res.json({succes: true,
                      message: 'delete successfully',
                         });
              }
              else if(resultat[0]. affectedRows ==0)
              {
                  res.json({succes: false,
                      message: 'error in delete',
                         });
              }   
       } catch (error) {
              
       }
       
         
     
    };

// get chapitre
exports.getDetailChapitre= async (req,res,next)=>{

  const id_chapitre = req.params.id_chapitre;
  const data = await chapitre.getDetailChapitre(id_chapitre);
  const attach= await attachments.getAttachByChapitre(id_chapitre);
  
  tab = new Array();
  const results = data[0][0];
  const resultAttach = attach[0];

  let id_chap=results.id_chapitre;
  let name=results.name;
  let shortName=results.shortName;
  let hours=results.hours;
  let descr=results.descr;
  let semester=results.semester;
  let creationDate=results.creationDate;
  let id_mat=results.id_mat;



    if (data[0].length !== 0 && resultAttach[0] !== 0 ){
        ress={
            id_chapitre:id_chap,
            name:name,
            shortName:shortName,
            hours:hours,
            descr:descr,
            semester:semester,
            creationDate:creationDate,
            id_mat:id_mat,
            attachment:resultAttach
        };

        tab.push(ress);

          res.json({
              succes: true,
              result: tab
          });
      }
      else if(data[0].length == 0){ 
          res.json({succes: false,
              message: 'chapitre introuvable',
                 });
      }
   
}

// get chapitre by mat
exports.getChapitreByMat= async (req,res,next)=>{

    const id_mat = req.params.id_mat;
    const data = await chapitre.getChapitreByMat(id_mat);
    const results = data[0];

    console.log("resulllll",results.length);
    tab = new Array();
    for(var j=0;j<results.length;j++)
    {

        const attach= await attachments.getAttachByChapitre(results[j].id_chapitre);
    
       
      
        const resultAttach = attach[0];
      
        let id_chap=results[j].id_chapitre;
        let name=results[j].name;
        let shortName=results[j].shortName;
        let hours=results[j].hours;
        let descr=results[j].descr;
        let semester=results[j].semester;
        let creationDate=results[j].creationDate;
        let id_matiree=results[j].id_mat;
      
      
      
          if (data[0].length !== 0 && resultAttach[0] !== 0 ){
              ress={
                  id_chapitre:id_chap,
                  name:name,
                  shortName:shortName,
                  hours:hours,
                  descr:descr,
                  semester:semester,
                  creationDate:creationDate,
                  id_mat:id_matiree,
                  attachment:resultAttach
              };
      
             
      
               
            }
            tab.push(ress);
         
    }
    res.json({
        succes: true,
        result: tab
    });
   
  }


  // ajout chapitre 


    exports.save= async (req,res,next)=>{

        console.log(req.body);
        name =req.body.name;
        shortName  =req.body.shortName ;
        hours  =req.body.hours ;
        descr  =req.body.descr ;
        semester  =req.body.semestre ;
        let date_ob = new Date();
        creationDate  =date_ob;
        id_mat=req.body.id_mat;
    
        console.log(name,shortName,hours,descr,semester,creationDate,id_mat);
      
    
        const ress= await chapitre.save(name,shortName,hours,descr,semester,creationDate,id_mat);
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


        // Modifier chapitre 
 exports.put= async (req,res,next)=>{

    id_chapitre=req.params.id_chapitre;
    name =req.body.name;
    shortName  =req.body.shortName ;
    hours  =req.body.hours ;
    descr  =req.body.descr ;
    semester  =req.body.semestre ;
    let date_ob = new Date();
    creationDate  =date_ob;
    id_mat=req.body.id_mat;


  

    const ress= await chapitre.put(name,shortName,hours,descr,semester,creationDate,id_mat,id_chapitre);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'Modifier avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de la modification ',
        });
     }
    }