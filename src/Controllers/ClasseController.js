const classe= require('../models/ClasseModel');
const matiere=require('../models/MatiereModel');
const etudiant=require('../models/EtudiantModel');
const{ validationResult } = require('express-validator');

 
 // delete classe
exports.delete = async(req, res, next) => {
  try {
    id_classe=req.params.id_classe;
  const resultat = await classe.delete(id_classe);
  res.status(200).json('true');
   
  }catch(err) {
    res.status(500).json('false');
    /*  res.send('false');
   
      next(err);
      */
  
      }
   
  };
   
 // delete matiere
exports.delete = async(req, res, next) => {
  try {
    id_matiere=req.params.id_matiere;
  const resultat = await matiere.delete(id_matiere);
  res.status(200).json(resultat);

    res.json('true')
   
  }catch(err) {
    res.status(500).json('false');
      }
   
  };
  //getAll classes
exports.getAllClasses = async(req, res, next) => {
try {
const [tabClasses] = await classe.fetchAll();
let classesList=[];
for(var i=0;i<tabClasses.length;i++)
{
  id_classe=tabClasses[0][i].id_classe;
  namee=tabClasses[0][i].name;
  shortName=tabClasses[0][i].shortName;
  year=tabClasses[0][i].year;
  department=tabClasses[0][i].department;
  creationDate=tabClasses[0][i].creationDate;
const studentsNumber =await classe.countStudents(id_classe);
let json = {
  id_classe:id_classe,
  name: `${namee}`,
  shortName:`${shortName}`,
  year:`${year}`,
  department:`${department}`,
  creationDate:`${creationDate}`,
  studentsNumber:studentsNumber

  
}

classesList.push(json);
}        
      res.status(200).json(classesList);



}catch(err) {
  res.status(500).json('false');

    }
 
};
exports.getClasseById = async(req, res, next) => {
  try {
    let id_classe=req.params.id_classe;
  const [ClasseLigne] = await classe.fetchById(id_classe);
   
  // {hgcg,c,c},[{idmatiere,idprof},{idmatiere,idprof}],[1,2,3]}
  //sinon classeToAdd[0][1]

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
  //retourne les id etudiants tab
  const [Etudiants] = await etudiant.fetchByIdClasse(id_classe,"etudiant");
  let tab=[];
  for(var i=0;i<Etudiants.length;i++)
{
  id_etudiant=Etudiants[0][i].id_user;
  tab.push(id_etudiant);
}


  //tab couple jsoncouple
  let coupleList=[];
  const [Matieres] = await matiere.fetchByIdClasse(id_classe);
  for(var i=0;i<Matieres.length;i++)
  {
  id_chapitre=Matieres[0].id_chapitre;
  id_matiere=Matieres[0].id_matiere;
let jsoncouple = {
  id_matiere:id_matiere,
 id_chapitre:id_chapitre,  
}
coupleList.push(jsoncouple);
}    




        res.status(200).json(jsonclasse,coupleList,tab);
  }catch(err) {
    res.status(500).json('false');
  
      }
   
  };
exports.create=async(req,res,next)=>{
  let classeToAdd =req.body;
 // {hgcg,c,c},[{idmatiere,idprof},{idmatiere,idprof}],[1,2,3]}
  //sinon classeToAdd[0][1]
  c=classeToAdd[0]
  tabmatier=classeToAdd[1]
  etudiants=classeToAdd[2]
  try{
    const res =await classe.save(c.name,c.shortName,c.year,c.department,c.creationDate);
    let id_classe=await classe.getId();
for(var i=0;i<etudiants.length;i++){
  const rest =await classe.setClasse(id_classe,etudiants[i]);
}
for(var j=0;j<tabmatier.length;j++){
  const resultat =await classe.setMat(id_classe,tabmatier[j][1]);
  const resultt =await classe.setProf(id_classe,tabmatier[j][2]);
}
    res.status(200).json('true');
  }catch{
    res.status(500).json('false');

  }
}
exports.update=async(req,res,next)=>{
  let classeToAdd =req.body;
 // {hgcg,c,c},[{idmatiere,idprof},{idmatiere,idprof}],[1,2,3]}
  //sinon classeToAdd[0][1]
  c=classeToAdd[0]
  tabmatier=classeToAdd[1]
  etudiants=classeToAdd[2]
  try{
    let id_classe=await c.id_classe;
    const res =await classe.updateClasse(id_classe,c.name,c.shortName,c.year,c.department,c.creationDate);
    
for(var i=0;i<etudiants.length;i++){
  const rest =await classe.setClasse(id_classe,etudiants[i]);
}
for(var j=0;j<tabmatier.length;j++){
  const resultat =await classe.setMat(id_classe,tabmatier[j][1]);
  const resultt =await classe.setProf(id_classe,tabmatier[j][2]);
}
    res.status(200).json('true');
  }catch{
    res.status(500).json('false');

  }
}

  
  

