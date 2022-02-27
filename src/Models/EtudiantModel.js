const db = require('../../Config/database');



module.exports = class etudiant {

    static fetchByIdClasse(id_classe,type) {
        return db.execute('SELECT * FROM uesr WHERE id_classe = ?,type=?', [id_classe,type]);
      }
};


