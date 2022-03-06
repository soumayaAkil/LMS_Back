const classe= require('../models/ClasseModel');
const matiere=require('../models/MatiereModel');
const etud=require('../models/EtudiantModel');
const Enseignant = require('../Models/EnseignantModel');

     /*
   
output: => {
{[{user1},{user2}],[{classe1},{classe2}],[{mat1,mat2}]}
    all user details, classe[](shortName, name, year), 
    matieres[],
    
}
      */
 // load prof detail
exports.getDetailP = async(req, res, next) => {
  try {

    id_user=req.params.id_user;
    let listClasse=[];

    let listMat=[];
    let listEtud=[];
    const [Matieres] = await Enseignant.fetchByIdProf(id_user);
    for(var j=0;j<Matieres.length;j++)
    {
    id_matiere=Matieres[j].id_matiere;
    id_classe=Matieres[j].id_classe;    
    namem=Matieres[j].name;  
    shortName=Matieres[j].shortName;
    types=Matieres[j].type;
    hours=Matieres[j].hours;
    descr=Matieres[j].descr;
    coef=Matieres[j].coef;
    creationDate=Matieres[j].creationDate;

        let jmat = {
        id_matiere:id_matiere,
        name: `${namem}`,
        shortName:`${shortName}`,
        type:`${types}`,
        hours:hours,
        descr:`${descr}`,   
        coef:coef, 
        creationDate:`${creationDate}`,  
      }
       listMat.push(jmat);
      
    }
   
    
  
  
    
    //classes
    const [classeM] = await Enseignant.fetchClasseE(id_user);
   
    for(var k=0;k<classeM.length;k++)
    {  

    let [ClasseLigne]= await classe.fetchById(classeM[k].id_classe);

      namee=ClasseLigne[0].name;
      shortName=ClasseLigne[0].shortName;
      year=ClasseLigne[0].year;
      department=ClasseLigne[0].department;
      creationDate=ClasseLigne[0].creationDate;
     
      id_c=ClasseLigne[0].id_classe;
     
    let jsonclasse = {
      id_classe:id_c,
      name: `${namee}`,
      shortName:`${shortName}`,
      year:`${year}`,
      department:`${department}`,
      creationDate:`${creationDate}`    
    }
    listClasse.push(jsonclasse);
  
  console.log(id_c)
 
//etud
const [Etudiants] = await etud.fetchByIdClasse(id_c,"etudiant");



for(var i=0;i<Etudiants.length;i++)
{
  
id_etudiant=Etudiants[i].id_user;
lastName=Etudiants[i].lastName;
firstName=Etudiants[i].firstName;
email=Etudiants[i].email;
photo=Etudiants[i].photo;
phone=Etudiants[i].phone;
birthDate=Etudiants[i].birthDate;
pwd=Etudiants[i].pwd;
type=Etudiants[i].type;
invitation=Etudiants[i].invitation;
creationDate=Etudiants[i].creationDate;
let jsonEtud = {
    id_etudiant:id_etudiant,
    lastName: `${lastName}`,
    firstName:`${firstName}`,
    email:`${email}`,
    photo:`${photo}`,
    phone:`${phone}`,
    birthDate:`${birthDate}`,
    pwd:`${pwd}`,
    type:`${type}`,
    invitation:`${invitation}`,
    creationDate:`${creationDate}`    
  }
 
listEtud.push(jsonEtud);
}

    }
  console.log(listClasse)
  console.log(listEtud)
  console.log(listMat)
  res.status(200).json({listEtud,listClasse,listMat});

   
  }catch(err) {
    res.status(500).json('false');
             }
    };

 
    exports.getList= async(req, res, next) => {
      
    try {
        id_user=req.params.id_user;
        let listEtud=[];
        const [nbmat] = await matiere.countMatieres(id_user);
        const nb=nbmat[0].c
        //fetchid classe
        const [Matieres] = await matiere.fetchByIdProf(id_user);
      
        for(var j=0;j<Matieres.length;j++)
        {
        id_classe=Matieres[0].id_classe;
const [Etudiants] = await etud.fetchByIdClasse(id_classe,"etudiant");
 for(var i=0;i<Etudiants.length;i++)
{
id_etudiant=Etudiants[i].id_user;
lastName=Etudiants[i].lastName;
firstName=Etudiants[i].firstName;
email=Etudiants[i].email;
photo=Etudiants[i].photo;
phone=Etudiants[i].phone;
birthDate=Etudiants[i].birthDate;
pwd=Etudiants[i].pwd;
type=Etudiants[i].type;
invitation=Etudiants[i].invitation;
creationDate=Etudiants[i].creationDate;
let jsonEtud = {
    id_etudiant:id_etudiant,
    lastName: `${lastName}`,
    firstName:`${firstName}`,
    email:`${email}`,
    photo:`${photo}`,
    phone:`${phone}`,
    birthDate:`${birthDate}`,
    pwd:`${pwd}`,
    type:`${type}`,
    invitation:`${invitation}`,
    creationDate:`${creationDate}`    
  }

listEtud.push(jsonEtud);
}
        }
    res.status(200).json({listEtud,nb});
  
     
    }catch(err) {
      console.log(err)
      res.status(500).json('false');
  
    
        }
     
      };
      exports.getAllEns = async(req, res, next) => {
        try {
        const [profsList] = await Enseignant.fetchAll();
        console.log(profsList)
           
              res.status(200).json(profsList);
        
        
        
        }catch(err) {
          res.status(500).json('false');
        
            }
         
        };
  