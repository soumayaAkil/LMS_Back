const test=require('../models/testModel');

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