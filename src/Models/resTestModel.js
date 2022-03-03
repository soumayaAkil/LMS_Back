const db = require('../../Config/database');

module.exports = class resTest {
    constructor(id_res,id_user,idTest,totalMarks){
        id_res=this.id_res;
        id_user=this.id_user;
        idTest=this.idTest;
        totalMarks=this.totalMarks;
    }

    static fetchResultatsByUser(id_user) {
        return db.execute('SELECT * FROM restest WHERE id_user = ?',[id_user]);
      }
     //save restest 
      static save (totalMarks,id_user,idTest){
        return db.execute('INSERT  INTO restest (totalMarks,id_user,idTest) VALUES (?,?,?)',
        [totalMarks,id_user,idTest]);
      }
}