const test=require('../models/testModel');
const chapitre=require('../Models/ChapitreModel')
const reponse=require('../Models/reponseModel')
const restestt=require('../Models/resTestModel')

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
        let id_chapitre=req.body.id_chapitre;
        let published= req.body.published;
        const results= await chapitre.getDetailChapitre(id_chapitre);
        const storedTest =results[0];
        const sortedTest2 =results[0][0];
    
                if(storedTest.length >0)
                {
                    const rest= await test.update(duration,date,id_chapitre,published,req.params.idTest);
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
        const id_chapitre = req.params.id_chapitre;
        
        const data = await test.findTestByChapitre(id_chapitre);
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
        console.log(duration);
        Datee =req.body.date;
        console.log(Datee);
        id_chapitre=req.body.id_chapitre;
        console.log(id_chapitre);
        published=req.body.published;
        console.log(published);
        heure=req.body.heure;
        console.log(heure);
        const ress= await test.save(duration,Datee,id_chapitre,published,heure);
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
        console.log(idTest)
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
      //Submit test 
     exports.submitTest = async (req,res,next)=>{
        let tab= req.body.quesRep[0].reponses;
        const id_user = req.body.id_user;
        const id_test = req.body.idTest;
         let restest =0 ;
         idQuestion=req.body.quesRep[0].idQuestion;
         for (let i = 0; i <req.body.quesRep.length; i++)
         {
          
              var quest= req.body.quesRep[i].idQuestion;
              console.log(quest);
           
         const repres=await reponse.findRepByQuestId(idQuestion); 
     
        if(repres[0].length!=tab.length){
          
            restest=restest+0;
        }else{
          
              let  i=0;
              let verif=true;
              
              while(verif==true && i<tab.length )
              {let x=0;
               let j=0;
                while(x==0 && j<repres[0].length )
                {    if(tab[i]==repres[0][j].idReponse){
                      x=1;
                    }
                    j++

                 }
                if(x==0){
                  verif=false;
                }
            i++
            }
            if(verif==false){
                restest=restest+0;
            }else{
                let pondquest=await test.getponderation(idQuestion);   
              restest=restest+(pondquest[0][0].Marks);
           
              
            }
        }
        }
        res.json ({note:restest
           
        
         
         
         })
         let saverestest=await restestt.save(restest,id_user,id_test);
     
  };
      
      