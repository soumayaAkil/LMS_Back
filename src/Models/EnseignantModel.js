const db = require('../../Config/database');



module.exports = class Enseignant {

    static fetchByIdClasse(id_classe,type) {
        return db.execute('SELECT * FROM user WHERE id_classe = ? AND type=?', [id_classe,type]);
      }
      static fetchByIdProf(id_user) {
        return db.execute('SELECT * FROM matiere WHERE id_user = ?', [id_user]);
      }
      static fetchClasseE(id_user){
        return db.execute ('SELECT DISTINCT id_classe FROM matiere WHERE id_user = ?'
        ,[id_user]);
     
    }
};


