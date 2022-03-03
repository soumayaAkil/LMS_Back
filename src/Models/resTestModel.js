const db = require('../../Config/database');

module.exports = class resTest {
    constructor(id_res,id_user,idTest,Marks){
        id_res=this.id_res;
        id_user=this.id_user;
        idTest=this.idTest;
        Marks=this.Marks;
    }

    static fetchResultatsByUser(id_user) {
        return db.execute('SELECT * FROM restest WHERE id_user = ?',[id_user]);
      }
}