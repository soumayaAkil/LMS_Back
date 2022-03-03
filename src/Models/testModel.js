const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class test {
    constructor(dureeMax,datePassage,id_chapitre,published){
        dureeMax=this.dureeMax;
        datePassage=this.datePassage;
        id_chapitre=this.id_chapitre;
        published=this.published;
       
    }

    static delete(idTest) {
        return db.execute('DELETE FROM test WHERE idTest = ?', [idTest]);
      }
      static fetchByIdTest(idTest) {
        return db.execute('SELECT * FROM test WHERE idTest = ?',[idTest]);
      }
}