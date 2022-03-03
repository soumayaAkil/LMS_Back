const test=require('../models/testModel');
const chapitre=require('../Models/ChapitreModel')

 // delete chapitre
 exports.delete = async(req, res, next) => {
  
       try {
              idTest=req.params.idTest;
              const resultat = await test.delete(idTest);
    
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
    //Edit test
    exports.put= async (req,res,next)=>{

        let duration= req.body.duration;
        let date= req.body.date;
        let idChapitre=req.body.idChapitre;
        let published= req.body.published;
        const results= await chapitre.getDetailChapitre(idChapitre);
        const storedTest =results[0];
        const sortedTest2 =results[0][0];
    
                if(storedTest.length >0)
                {
                    const rest= await test.update(duration,date,idChapitre,published,req.params.idTest);
                    res.json({update:true}); 
                }
                else if(sortedTest2 == null)
                {
                    res.json({succes: false,
                        message: 'chapitre introuvable',})
                    
                
            
                }
        };
        //test detail
        exports.testDetailsc = async (req,res,next)=>{
            let chapTest=await test.testDetails(req.params.idTest); 
            let i=0
            let nom=chapTest[0][i].name;
            let semester=chapTest[0][i].semester;
            let duration=chapTest[0][i].duration;
            let date=chapTest[0][i].date;
            let [questions]= await test.testDetailsQ(req.params.idTest);
            for( let j=0;j<questions[0].length;j++){
             let id_question=questions[0][j].idQuestion;
             let questtxt=questions[0][j].questionText;
           
            }
 res.json ({chapitre:nom,
            semester:semester,
            duration:duration,
            date:date,
            Questions:questions
           
        
         
         
         })
      
     };
     //list test by id chapitre
     exports.getTestByChapitre= async (req,res,next)=>{
        const idChapitre = req.params.idChapitre;
        
        const data = await test.findTestByChapitre(idChapitre);
        const results = data[0];
            if (data[0].length !== 0){
                res.json({
                    succes: true,
                    test: results
                });
            }
            else if(data[0].length == 0) { 
                res.json({succes: false,
                    message: 'test introuvable',
                       });
            }  
    }
    //Add Test
    exports.save= async (req,res,next)=>{
        duration =req.body.duration;
        let date_ob = new Date();
        creationDate  =date_ob;
        idChapitre=req.body.idChapitre;
        published=req.body.published;
        const ress= await test.save(duration,creationDate,idChapitre,published);
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
         //Publish test
         
    exports.publishupdate = async (req,res,next)=>{
        const idTest = req.params.idTest;
        const data = await test.getdate(idTest);
    const results = data[0][0];
    const dateprevu =(results.date).toString().slice(4,15);
    const today = new Date();
    const currentdat = today.toLocaleString("en-US", { month: "short" })+" "+"0"+(today.getDate()+1)+" "+today.getFullYear();

        if(dateprevu == currentdat){
            const publishTeste = await test.publish_test(req.params.idTest); 
            res.json({succes:true}); 

        }else if(dateprevu != currentdat) {
            res.json({succes:false,
            message:"incorrect date"}); 

        }
      
      };
      
      