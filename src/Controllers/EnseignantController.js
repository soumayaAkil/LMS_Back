const classe= require('../models/ClasseModel');
const matiere=require('../models/MatiereModel');
const etudiant=require('../models/EtudiantModel');
const { type } = require('express/lib/response');

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
    const [Matieres] = await matiere.fetchByIdProf(id_user);
    for(var i=0;i<Matieres.length;i++)
    {id_matiere=Matieres[0].id_matiere;
    id_classe=Matieres[0].id_classe;
    namem=Matieres[0].name;
    shortName=Matieres[0].shortName;
    type=Matieres[0].type;
    hours=Matieres[0].hours;
    descr=Matieres[0].descr;
    coef=Matieres[0].coef;
    creationDate=Matieres[0].creationDate;
    let jsonMat = {
        id_matiere:id_matiere,
        name: `${namem}`,
        shortName:`${shortName}`,
        type:`${type}`,
        hours:`${hours}`,
        descr:`${descr}`,   
        coef:coef, 
        creationDate:`${creationDate}`,  
      }
  listMat.push(jsonMat);
    //classes
    const [ClasseLigne] = await classe.fetchById(id_classe);
      namee=ClasseLigne[0].name;
      shortName=ClasseLigne[0].shortName;
      year=tabClasses[0].year;
      department=ClasseLigne[0].department;
      creationDate=ClasseLigne[0].creationDate;
    let jsonclasse = {
      id_classe:id_classe,
      name: `${namee}`,
      shortName:`${shortName}`,
      year:`${year}`,
      department:`${department}`,
      creationDate:`${creationDate}`    
    }
listClasse.push(jsonclasse);
//etud
const [Etudiants] = await etudiant.fetchByIdClasse(id_classe,"etudiant");
let tab=[];
for(var i=0;i<Etudiants.length;i++)
{
id_etudiant=Etudiants[0][i].id_user;
lastName=Etudiants[0][i].lastName;
firstName=Etudiants[0][i].firstName;
email=Etudiants[0][i].email;
photo=Etudiants[0][i].photo;
phone=Etudiants[0][i].phone;
birthDate=Etudiants[0][i].birthDate;
pwd=Etudiants[0][i].pwd;
type=Etudiants[0][i].type;
invitation=Etudiants[0][i].invitation;
creationDate=Etudiants[0][i].creationDate;
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
  res.status(200).json(listEtud,listClasse,listMat);

   
  }catch(err) {
    res.status(500).json('false');
             }
    };

 
    exports.getList= async(req, res, next) => {
    try {
        id_user=req.params.id_user;
        let listEtud=[];
        const nbmat = await matiere.countMatieres(id_user);
        //fetchid classe
        const [Matieres] = await matiere.fetchByIdProf(id_user);
        for(var i=0;i<Matieres.length;i++)
        {
        id_classe=Matieres[0].id_classe;

//etud
const [Etudiants] = await etudiant.fetchByIdClasse(id_classe,"etudiant");
let tab=[];
for(var i=0;i<Etudiants.length;i++)
{
id_etudiant=Etudiants[0][i].id_user;
lastName=Etudiants[0][i].lastName;
firstName=Etudiants[0][i].firstName;
email=Etudiants[0][i].email;
photo=Etudiants[0][i].photo;
phone=Etudiants[0][i].phone;
birthDate=Etudiants[0][i].birthDate;
pwd=Etudiants[0][i].pwd;
type=Etudiants[0][i].type;
invitation=Etudiants[0][i].invitation;
creationDate=Etudiants[0][i].creationDate;
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
    res.status(200).json(listEtud,nbmat);
  
     
    }catch(err) {
      res.status(500).json('false');
  
    
        }
     
    };
  