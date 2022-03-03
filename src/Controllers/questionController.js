const express= require('express');
const question = require('../Models/questionModel');
const test= require('../Models/testModel');


  //get question
exports.getQuestion= async (req,res,next)=>{
    const idQuestion = req.params.idQuestion;
    const data = await question.findQuesById(idQuestion);
    const results = data[0][0];
      if (data[0].length !== 0){
            res.json({
                succes: true,
                question: results
            });
        }
        else if(data[0].length == 0) { 
            res.json({succes: false,
                message: 'question introuvable',
                   });
        }  
};
// EDIT question
exports.put= async (req,res,next)=>{
  let quest= req.body.questionText;
  let ponderation= req.body.Marks;
  let idTest= req.body.idTest;
           
  const results= await test.findTestById(idTest);
  const storedQues =results[0];
  console.log(storedQues);
  const sortedQues2 =results[0][0];


          if(storedQues.length >0  )
          {
              const rest=await question.update(quest,ponderation,idTest,req.params.idQuestion);
              res.json({update:true}); 
          }
          else if(sortedQues2 == null )
          {
              res.json({succes: false,
                  message: 'test introuvable',})
              
          
      
          }
  }
  //DELETE question
  exports.deleteQqqq = async (req,res,next)=>{
    const deletequestion = await question.deleteQ(req.params.idQuestion);
    if(deletequestion[0].affectedRows == 1)
    {
        res.json({succes: true,
            message: 'delete successfully',
               });
    }
    else if(deletequestion[0].affectedRows ==0)
    {
        res.json({succes: false,
            message: 'error in delete',
               });
    } 
    }
    //Add question
    exports.save= async (req,res,next)=>{
        text =req.body.questionText;
        marks  =req.body.Marks ;
        idTest=req.body.idTest;
        const ress= await question.save(text,marks,idTest);
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
      
      
      



