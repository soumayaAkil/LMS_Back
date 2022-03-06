const chapitre=require('../models/ChapitreModel');
const attachments=require('../models/AttachementsModel');
const testModel=require('../models/testModel');

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
  let id_matiere=results.id_matiere;



    if (data[0].length !== 0 && resultAttach[0] !== 0 ){
        ress={
            id_chapitre:id_chap,
            name:name,
            shortName:shortName,
            hours:hours,
            descr:descr,
            semester:semester,
            creationDate:creationDate,
            id_matiere:id_matiere,
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

    const id_matiere = req.params.id_matiere;
    const data = await chapitre.getChapitreByMat(id_matiere);
    const results = data[0];

    console.log("resulllll",results.length);
    tab = new Array();
    for(var j=0;j<results.length;j++)
    {

        const attach= await attachments.getAttachByChapitre(results[j].id_chapitre);
    
       const restestchap = await testModel.findIdTestByChapitre(results[j].id_chapitre);
       console.log("restestchap",restestchap[0].length);
      
        const resultAttach = attach[0];
      
        let id_chap=results[j].id_chapitre;
        let name=results[j].name;
        let shortName=results[j].shortName;
        let hours=results[j].hours;
        let descr=results[j].descr;
        let semester=results[j].semester;
        let creationDate=results[j].creationDate;
        let id_matiree=results[j].id_matiere;
      
        if(restestchap[0].length>0)
        {
            if (data[0].length !== 0 && resultAttach[0] !== 0 ){
                ress={
                    id_chapitre:id_chap,
                    name:name,
                    shortName:shortName,
                    hours:hours,
                    descr:descr,
                    semester:semester,
                    creationDate:creationDate,
                    id_matiere:id_matiree,
                    nbrTest:restestchap[0].length,
                    tests:restestchap[0],
                    attachment:resultAttach
                };
        
               
        
                 
              }
              tab.push(ress);
        }
      else
      {
        if (data[0].length !== 0 && resultAttach[0] !== 0 ){
            ress={
                id_chapitre:id_chap,
                name:name,
                shortName:shortName,
                hours:hours,
                descr:descr,
                semester:semester,
                creationDate:creationDate,
                id_matiere:id_matiree,
                nbrTest:restestchap[0].length,
                attachment:resultAttach
            };
    
           
    
             
          }
          tab.push(ress);
      }
         
         
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
        id_matiere=req.body.id_matiere;
    
        console.log(name,shortName,hours,descr,semester,creationDate,id_matiere);
      
    
        const ress= await chapitre.save(name,shortName,hours,descr,semester,creationDate,id_matiere);
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
    id_matiere=req.body.id_matiere;


  

    const ress= await chapitre.put(name,shortName,hours,descr,semester,creationDate,id_matiere,id_chapitre);
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