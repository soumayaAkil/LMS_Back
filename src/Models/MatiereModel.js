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
      return db.execute('SELECT COUNT(*) AS c FROM matiere WHERE id_user = ?', [id_enseignant]);
    }

    static fetchByIdProf(id_user) {
      return db.execute('SELECT * FROM matiere WHERE id_user = ?', [id_user]);
    }
    static fetchByIdMat(id_matiere){
      return db.execute('SELECT * FROM chapitre WHERE id_matiere = ?', [id_matiere]);
    }

};