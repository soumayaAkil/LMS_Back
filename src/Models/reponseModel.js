const db = require('../../Config/dbConfig');
module.exports = class reponse{
    constructor(idReponse,answerText,correct,idQuestion){
        this.idReponse=idReponse;
        this.answerText=answerText;
        this.correct=correct;
        this.idQuestion=idQuestion;
       
    }

 
 
    //EDIT reponse
    static update(answerText,correct,idQuestion,idReponse) {
        return db.execute('UPDATE reponse SET answerText = ?, correct = ?,idQuestion = ? WHERE idReponse = ?',
        [answerText,correct,idQuestion,idReponse]);
      }
      //DELETE reponse
      static delete(id_reponse) {
        return db.execute('DELETE FROM reponse WHERE idReponse = ?',[id_reponse]);
      }
      //Add reponse
      static save(answerText,correct,idQuestion){
        return db.execute('INSERT  INTO reponse (answerText,correct,idQuestion) VALUES (?,?,?)',
        [answerText,correct,idQuestion]);
    }
    //reponsebyidquestion
    static findRepByQuestId(idQuestion){
      return db.execute(
          'SELECT * FROM reponse WHERE correct="1" AND idQuestion = ?',[idQuestion]);     
  }
    
 

  
};