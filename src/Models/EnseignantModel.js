const db = require('../../Config/database');



module.exports = class Enseignant {

    static fetchByIdClasse(id_classe,type) {
        return db.execute('SELECT * FROM user WHERE id_classe = ? AND type=?', [id_classe,type]);
      }
};


