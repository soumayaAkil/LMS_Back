const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class User {
    constructor(lastName ,firstName ,email ,photo ,phone ,birthDate,pwd,type ,invitation ,creationDate){
        lastName =this.lastName ;
        firstName =this.firstName ;
        email =this.email ;
        photo =this.photo ;
        phone =this.phone ;
        birthDate =this.birthDate ;
        pwd  =this.pwd  ;
        type  =this.type  ;
        invitation  =this.invitation  ;
        creationDate=this.creationDate; 
       
    }


      static getUser(id_user) {
        return db.execute('SELECT * FROM user WHERE id_user = ?', [id_user]);
      }

      static InvitUser(lastName ,firstName ,email,type ,invitation ,creationDate,id_classe) {
        return db.execute('INSERT INTO user (lastName ,firstName ,email ,type ,invitation ,creationDate,id_classe) VALUES (?,?,?,?,?,?,?)', [lastName ,firstName ,email,type ,invitation ,creationDate,id_classe]);
      }


      static InscriUser(phone,birthDate,pwd,invitation,id_user) {
        return db.execute('UPDATE user SET phone  = ? , birthDate = ?, pwd = ? , invitation = ? WHERE id_user = ?', [phone ,birthDate,pwd,invitation,id_user]);
      }

      static CancelInvitation(invitation,id_user) {
        return db.execute('UPDATE user SET invitation = ? WHERE id_user = ?', [invitation,id_user]);
      }

      static MaxIdUser() {
        return db.execute('SELECT MAX(id_user) as id_user from user = ?');
      }

      static SetImageUser(photo,id_user) {
        return db.execute('INSERT INTO user (photo) VALUES (?) WHERE id_user = ?', [photo,id_user]);
      }
      static findOne(email){
        return db.execute('SELECT * FROM user WHERE email = ?', [email]);
      }
     
}