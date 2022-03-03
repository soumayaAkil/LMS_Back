const express= require('express');
const reponse = require('../models/reponseModel')
const question = require('../models/questionModel')
//EDIT reponse
exports.put= async (req,res,next)=>{
    let quest= req.body.answerText;
    let ponderation= req.body.correct;
    let idTest= req.body.idQuestion;
             
    const results= await question.findQuesById(idTest);
    const storedQues =results[0];
    console.log(storedQues)
    const sortedQues2 =results[0][0];
  
  
            if(storedQues.length >0  )
            {
                const rest=await reponse.update(quest,ponderation,idTest,req.params.idReponse);
                res.json({update:true}); 
            }
            else if(sortedQues2 == null )
            {
                res.json({succes: false,
                    message: 'question introuvable',})
                
            
        
            }
    }
    //DELETE reponse
    exports.delete = async (req,res,next)=>{

        const deletereponse = await reponse.delete(req.params.idReponse);
       
        if(deletereponse[0]. affectedRows == 1)
        {
            res.json({succes: true,
                message: 'delete successfully',
                   });
        }
        else if(deletereponse[0]. affectedRows ==0)
        {
            res.json({succes: false,
                message: 'error in delete',
                   });
        } 
        }
        //Add reponse
        exports.save= async (req,res,next)=>{
            text =req.body.answerText;
            correct  =req.body.correct ;
            idQuestion=req.body.idQuestion;
            console.log(text)
            console.log(correct)
            console.log(idQuestion)
            const ress= await reponse.save(text,correct,idQuestion);
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
          
          
  
  
  