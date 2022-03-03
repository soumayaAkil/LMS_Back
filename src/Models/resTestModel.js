const db = require('../../Config/database');

module.exports = class resTest {
    constructor(id_res,id_user,idTest,res){
        id_res=this.id_res;
        id_user=this.id_user;
        idTest=this.idTest;
        resultat=this.rresultates;
    }

    static fetchResultatsByUser(id_user) {
        return db.execute('SELECT * FROM restest WHERE id_user = ?',[id_user]);
      }
}