const db = require('../../Config/database');
/**
 *
 */


module.exports = class classe {
    constructor(name,shortName,year,department,creationDate){
        name=this.name;
        shortName=this.shortName;
        year=this.year;
        department=this.department;
        creationDate=this.creationDate; 
    }
  

    static save(name,shortName,year,department,creationDate){
        return db.execute('INSERT INTO classe (name,shortName,year,department,creationDate) VALUES (?,?,?,?,?)',
        [name,shortName,year,department,creationDate]);
    }
    static setMat(id_classe,mat){
        return db.execute('UPDATE matiere SET id_classe = ? WHERE id_matiere = ?',[id_classe,mat]);
    }
    static setProf(id_classe,prof){
        return db.execute('UPDATE matiere SET id_classe = ? WHERE id_enseignant = ?',[id_classe,prof]);
    }

  
      static updateClasse(id_classe,name,shortName,year,department,creationDate) {
        return db.execute('UPDATE classe SET name = ?, shortName= ? ,year= ? ,departement= ? , creationDate= ? WHERE id_classe = ?',
         [name,shortName,year,department,creationDate,id_classe]);
      }


      static delete(id_classe) {
        return db.execute('DELETE FROM classe WHERE id_classe = ?', [id_classe]);
      }
      static countStudents(id_classe,etud){
        return db.execute('SELECT count(*) FROM user WHERE id_classe = ? AND type=?', [id_classe,etud]);
      }
      static fetchAll(){
        return db.execute ('SELECT * FROM classe');
     
    }
    static fetchById(id_classe){
        return db.execute ('SELECT * FROM classe WHERE id_classe=?',[id_classe]);
     
    }
    static setClasse(id_classe,id_etudiant){
        return db.execute('UPDATE etudiant SET id_classe = ? WHERE id_etudiant = ?',
        [id_classe,id_etudiant]);
     }
     static getId() {
        return db.execute ('SELECT max(id_classe) FROM classe ');
     } 
};