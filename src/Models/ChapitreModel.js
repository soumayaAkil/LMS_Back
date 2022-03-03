const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class chapitre {
    constructor(name,shortName,hours,descr,semestre,creationDate,id_matiere){
        name=this.name;
        shortName=this.shortName;
        hours=this.hours;
        descr=this.descr;
        semestre=this.semestre;
        creationDate=this.creationDate; 
        id_matiere=this.id_matiere;
    }

    static delete(id_chapitre) {
        return db.execute('DELETE FROM chapitre WHERE id_chapitre = ?', [id_chapitre]);
      }

      static getDetailChapitre(id_chapitre) {
        return db.execute('SELECT * FROM chapitre WHERE id_chapitre = ?', [id_chapitre]);
      }

      static getChapitreByMat(id_matiere) {
        return db.execute('SELECT * FROM chapitre WHERE id_matiere = ?', [id_matiere]);
      }

      static save(name,shortName,hours,descr,semester,creationDate,id_matiere){
        return db.execute('INSERT  INTO chapitre (name,shortName,hours,descr,semester,creationDate,id_matiere) VALUES (?,?,?,?,?,?,?)',
        [name,shortName,hours,descr,semester,creationDate,id_matiere]);
    }

    static put(name,shortName,hours,descr,semester,creationDate,id_matiere,id_chapitre){
      return db.execute('UPDATE chapitre SET name = ?,shortName = ?,hours = ?,descr = ?,semester = ?,creationDate = ?, id_matiere = ? WHERE id_chapitre = ?',
      [name,shortName,hours,descr,semester,creationDate,id_matiere,id_chapitre]);
  }
}