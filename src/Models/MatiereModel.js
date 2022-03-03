const db = require('../../Config/database');
/**
 *
 */


module.exports = class matiere {

    static delete(id_matiere) {
        return db.execute('DELETE FROM matiere WHERE id_matiere = ?', [id_matiere]);
      }
      
    static fetchByIdClasse(id_classe) {
      return db.execute('SELECT * FROM matiere WHERE id_classe = ?', [id_classe]);
    }
    static countMatieres(id_enseignant){
      return db.execute('SELECT count(*) FROM matiere WHERE id_user = ?', [id_enseignant]);
    }
    //get all matieres
    static detailMatiere(){
      return db.execute('SELECT * FROM matiere');
    }
    //add matiere
    static save(name,hours,type,coef,shortname,descr,creationDate,id_classe){
      return db.execute('INSERT  INTO matiere (name,hours,type,coef,shortname,descr,creationDate,id_classe) VALUES (?,?,?,?,?,?,?,?)',
      [name,hours,type,coef,shortname,descr,creationDate,id_classe]);
  }
  
  



};