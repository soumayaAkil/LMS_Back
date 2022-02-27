const db = require('../util/database');
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
};