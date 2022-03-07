const classe = require('../models/ClasseModel');
const matiere = require('../models/MatiereModel');
const etudiant = require('../models/EtudiantModel');
const ens = require('../Models/EnseignantModel');


// delete classe
exports.delete = async (req, res, next) => {
  try {
    id_classe = req.query.id_classe;
    console.log(id_classe)
    const resultat = await classe.delete(id_classe);
    res.status(200).json('true');

  } catch (err) {
    res.status(500).json('false');
    /*  res.send('false');
   
      next(err);
      */

  }

};

//getAll classes
exports.getAllClasses = async (req, res, next) => {
  try {
    const [tabClasses] = await classe.fetchAll();
    console.log(tabClasses[0])
    let classesList = [];
    for (var i = 0; i < tabClasses.length; i++) {
      id_classe = tabClasses[i].id_classe;
      namee = tabClasses[i].name;
      shortName = tabClasses[i].shortName;
      year = tabClasses[i].year;
      department = tabClasses[i].department;
      creationDate = tabClasses[i].creationDate;
      const [studentsNumber] = await classe.countStudents(id_classe, "etudiant");
      let nb = studentsNumber[0].nbclass;
      let json = {
        id_classe: id_classe,
        name: `${namee}`,
        shortName: `${shortName}`,
        year: `${year}`,
        department: `${department}`,
        creationDate: `${creationDate}`,
        studentsNumber: nb


      }

      classesList.push(json);
    }
    res.status(200).json(classesList);



  } catch (err) {
    res.status(500).json('false');

  }

};
exports.getClasseById = async (req, res, next) => {
  try {
    let id_classe = req.params.id_classe;
    const [ClasseLigne] = await classe.fetchById(id_classe);

    // {hgcg,c,c},[{idmatiere,idprof},{idmatiere,idprof}],[1,2,3]}
    //sinon classeToAdd[0][1]

    namee = ClasseLigne[0].name;
    shortName = ClasseLigne[0].shortName;
    year = ClasseLigne[0].year;
    department = ClasseLigne[0].department;
    creationDate = ClasseLigne[0].creationDate;
    let Classe = {
      id_classe: id_classe,
      name: `${namee}`,
      shortName: `${shortName}`,
      year: `${year}`,
      department: `${department}`,
      creationDate: `${creationDate}`
    }

    //retourne les id etudiants tab
    const [Etudiants] = await etudiant.fetchByIdClasse(id_classe, "etudiant");
    let ListEtudiants = [];
    for (var i = 0; i < Etudiants.length; i++) {
      id_etudiant = Etudiants[i].id_user;
      photo = Etudiants[i].photo;
      lastName = Etudiants[i].lastName;
      firstName = Etudiants[i].firstName;
      let jsonetud = {
        id_etudiant: id_etudiant,
        photo: `${photo}`,
        lastName: `${lastName}`,
        firstName: `${firstName}`,
      }
      ListEtudiants.push(jsonetud);
    }

    let id_enseignant;
    //tab couple jsoncouple
    let IDMat = [];
    const [Matieres] = await matiere.fetchByIdClasse(id_classe);
    for (var i = 0; i < Matieres.length; i++) {

      id_user = Matieres[0].id_user;
      nameM = Matieres[0].name;
      shortName = Matieres[0].shortName;
      id_matiere = Matieres[0].id_matiere;

      const [Chap] = await matiere.fetchByIdMat(id_matiere);
      id_chapitre = Chap[0].id_chapitre;

      const [prof] = await ens.fetchById(id_user);
      console.log(prof);
      photo = prof[0].photo;
      firstName = prof[0].firstName;
      lastName = prof[0].lastName;


      const [nbTest] = await classe.countTests(id_chapitre);
      nbTestt = nbTest[0].nn;
      let jmatid = {

        id_matiere: id_matiere,
        name: `${nameM}`,
        shortName: `${shortName}`,
        id_enseignant, id_user,
        photo: `${photo}`,
        lastName: `${lastName}`,
        firstName: `${firstName}`,
        NbreTests: nbTestt,
      }

      IDMat.push(jmatid);
    }
    res.status(200).json({ Classe, IDMat, ListEtudiants });
  } catch (err) {
    console.log(err)
    res.status(200).json(err);

  }

};
exports.create = async (req, res, next) => {
  try {
    let classeToAdd = req.body;
    /*
    {
    name: 'ss',
    shortName: 'sss',
    year: '2020',
    department: 'ss',
    creationDate: '12-10-2020'
  }
  [ { id_matiere: 1, id_user: 1 }, { id_matiere: 2, id_user: 1 } ]
  [ 1, 2, 3 ]*/
    //classeToAdd.creationDate = new Date(classeToAdd.creationDate).toISOString().split('T')[0];
    let c = classeToAdd.classe
    let tabmatier = classeToAdd.matieres;
    let etudiants = classeToAdd.etudiant;

    const ress = await classe.save(c.name, c.shortName, c.year, c.department, c.creationDate);
    let [Mclasse] = await classe.getId();

    let id_classe = Mclasse[0].id;
    for (var i = 0; i < etudiants.length; i++) {

      const rest = await classe.setClass(id_classe, etudiants[i]);
    }
    for (var j = 0; j < tabmatier.length; j++) {
      const resultat = await classe.setMat(id_classe, tabmatier[j].id_matiere);
      const resultt = await classe.setProf(id_classe, tabmatier[j].id_user);
    }
    res.status(200).json('true');
  } catch (err) {
    console.log(err);
    res.status(500).json('false');

  }
}
exports.update = async (req, res, next) => {
  let classeToAdd = req.body;
  // {hgcg,c,c},[{idmatiere,idprof},{idmatiere,idprof}],[1,2,3]}
  //sinon classeToAdd[0][1]
  let c = classeToAdd.classe
  let tabmatier = classeToAdd.matieres;
  let etudiants = classeToAdd.etudiant;
  try {
    let id_classe = await c.id_classe;
    const ress = await classe.updateClasse(id_classe, c.name, c.shortName, c.year, c.department, c.creationDate);

    for (var i = 0; i < etudiants.length; i++) {
      const rest = await classe.setClass(id_classe, etudiants[i]);
    }
    for (var j = 0; j < tabmatier.length; j++) {
      const resultat = await classe.setMat(id_classe, tabmatier[j].id_matiere);
      const resultt = await classe.setProf(id_classe, tabmatier[j].id_user);
    }
    res.status(200).json('true');
  } catch (err) {
    console.log(err)
    res.status(500).json('false');

  }
}




