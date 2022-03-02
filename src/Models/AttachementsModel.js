const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class attachments {
    constructor(id_attach,name,creationDate,id_chapitre){
        id_attach=this.id_attach;
        name=this.name;
        creationDate=this.creationDate; 
        id_chapitre=this.id_chapitre;
    }

   

      static getAttachByChapitre(id_chapitre) {
        return db.execute('SELECT * FROM attachments WHERE id_chapitre = ?', [id_chapitre]);
      }

      static save(name,creationDate,id_chapitre){
        return db.execute('INSERT  INTO attachments (name,creationDate,id_chapitre) VALUES (?,?,?)',
        [name,creationDate,id_chapitre]);
    }

    static put(name,creationDate,id_chapitre,id_attach){
      return db.execute('UPDATE attachments SET  name = ?, creationDate = ?, id_chapitre = ? WHERE id_attach = ?',
      [name,creationDate,id_chapitre,id_attach]);
  }
}