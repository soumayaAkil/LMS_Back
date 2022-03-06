const etudiant=require('../models/EtudiantModel');
const classe=require('../models/ClasseModel');
const test=require('../models/testModel');
const resTest=require('../models/resTestModel');

// load students details
exports.loadStudentDetails= async (req,res,next)=>{

    const data = await etudiant.fetchEtudiants();
    const results = data[0];

  //  console.log("results",results);
    tab = new Array();
    tabDataTest=new Array();
   
    
    for(var j=0;j<results.length;j++)
    {
      tabTest =new Array();
        const classeEtud= await classe.fetchById(results[j].id_classe);
        
        const resultclasseEtud = classeEtud[0][0];
          const datarestest = await resTest.fetchResultatsByUser(results[j].id_user);
      
        for(var i=0;i<datarestest[0].length;i++){
      
            const resultTestEtudiant =datarestest[0][i].totalMarks;
            const datatest = await test.fetchByIdTest(datarestest[0][i].idTest);
          console.log("resultTestEtudiant",resultTestEtudiant);
        
       
          
      
        tests={
          resultatTestEtud:resultTestEtudiant,
          testEtud:datatest[0]
        }
        tabTest.push(tests)
        }
       
        ress={
          Etudiantt:results[j],
          classeEtud:resultclasseEtud,
          testEtudiant:tabTest
         
      };
        
     
      //console.log("ress",ress);
      tab.push(ress);
           
         
    }
    res.json({
        succes: true,
        result: tab
    });
   
  }
  exports.getEtudNonc=async(req,res,next)=>{
try{
  [resE]=await etudiant.fetchEtudiantsNON();
 let  ETUDList=[];
for(var i=0;i<resE.length;i++)
{
  id_user=resE[i].id_user;
  photo=resE[i].photo;
  lastName=resE[i].lastName;
  firstName=resE[i].firstName;


let json = {
  id_etudiant:id_user,
  photo: `${photo}`,
  lastName:`${lastName}`,
  firstName:`${firstName}`, 
}

ETUDList.push(json);
}        
      res.status(200).json(ETUDList);



}catch(err) {
  console.log(err)
  res.status(500).json('false');

    }
 
};


   