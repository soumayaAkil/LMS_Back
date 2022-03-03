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
//console.log("j",j);
        const classeEtud= await classe.fetchById(results[j].id_classe);
        
        const resultclasseEtud = classeEtud[0][0];
       // console.log("resultclasseEtud",resultclasseEtud);
      
    
   
      // recupere test et res 

        const datarestest = await resTest.fetchResultatsByUser(results[j].id_user);
      //  console.log("datarestest",datarestest[0]);
      
        for(var i=0;i<datarestest[0].length;i++){
         console.log("iiiiiiiiiiii",i);
          console.log("jjjjj",j);
            const resultTestEtudiant =datarestest[0][i].resultat;
            const datatest = await test.fetchByIdTest(datarestest[0][i].idTest);
          console.log("resultTestEtudiant",resultTestEtudiant);
        
          // for(var a=0;a<datatest[0].length;a++){
          //   tabDataTest.push(datatest[a]);
         
          // }
          
      
        // tabDataTest.push(datatest[0][0]);
        
       // console.log("datatest[j]",datatest[j]);
        //  console.log("tabDataTest",tabDataTest[i]);
 
     
       //  console.log("tests",tests);
        // console.log("tabTest",tabTest);
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


    // recupere etudiant

        // let id_user=results[j].id_user;
        // let lastName=results[j].lastName;
        // let firstName=results[j].firstName;
        // let email=results[j].email;
        // let photo=results[j].photo;
        // let phone=results[j].phone;
        // let birthDate=results[j].birthDate;
        // let pwd=results[j].pwd;
        // let type=results[j].type;
        // let invitation=results[j].invitation;
        // let creationDateEtudiant=results[j].creationDate;
       
          // recupere classe

        //   let nameClasse=resultclasseEtud.name;
        //   let shortNamelasse=resultclasseEtud.shortName;
        //   let year=resultclasseEtud.year;
        //   let department=resultclasseEtud.department;
        //   let creationDateClasse=resultclasseEtud.creationDate;