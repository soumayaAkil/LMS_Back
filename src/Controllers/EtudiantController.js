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
         console.log("iiiiiiiiiiii",i);
          console.log("jjjjj",j);
            const resultTestEtudiant =datarestest[0][i].resultat;
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


   