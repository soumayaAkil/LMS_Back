const db = require('../../Config/database');



module.exports = class etudiant {

    static fetchByIdClasse(id_classe,type) {
        return db.execute('SELECT * FROM user WHERE id_classe = ? AND type = ?', [id_classe,type]);
      }

      static fetchEtudiants() {
        return db.execute('SELECT * FROM user WHERE type = "etudiant"');
      }
      static fetchEtudiantsNON() {
        return db.execute('SELECT * FROM user WHERE type ="etudiant" AND id_classe=0');
      }
};


