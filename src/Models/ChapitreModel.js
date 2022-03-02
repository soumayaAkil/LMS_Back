const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class chapitre {
    constructor(name,shortName,hours,descr,semestre,creationDate,id_mat){
        name=this.name;
        shortName=this.shortName;
        hours=this.hours;
        descr=this.descr;
        semestre=this.semestre;
        creationDate=this.creationDate; 
        id_mat=this.id_mat;
    }

    static delete(id_chapitre) {
        return db.execute('DELETE FROM chapitre WHERE id_chapitre = ?', [id_chapitre]);
      }

      static getDetailChapitre(id_chapitre) {
        return db.execute('SELECT * FROM chapitre WHERE id_chapitre = ?', [id_chapitre]);
      }

      static getChapitreByMat(id_mat) {
        return db.execute('SELECT * FROM chapitre WHERE id_mat = ?', [id_mat]);
      }

      static save(name,shortName,hours,descr,semester,creationDate,id_mat){
        return db.execute('INSERT  INTO chapitre (name,shortName,hours,descr,semester,creationDate,id_mat) VALUES (?,?,?,?,?,?,?)',
        [name,shortName,hours,descr,semester,creationDate,id_mat]);
    }

    static put(name,shortName,hours,descr,semester,creationDate,id_mat,id_chapitre){
      return db.execute('UPDATE chapitre SET name = ?,shortName = ?,hours = ?,descr = ?,semester = ?,creationDate = ?, id_mat = ? WHERE id_chapitre = ?',
      [name,shortName,hours,descr,semester,creationDate,id_mat,id_chapitre]);
  }
}