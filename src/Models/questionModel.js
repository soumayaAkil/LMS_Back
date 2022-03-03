const db = require('../../Config/dbConfig');
module.exports = class Question{
    constructor(idQuestion,questionText,Marks,idTest){
        this.idQuestion=idQuestion;
        this.questionText=questionText;
        this.Marks=Marks;
        this.idTest = idTest ;
     
      
    }
  //get question

    static findQuesById(idQuestion){
        return db.execute(
            'SELECT * FROM question WHERE idQuestion = ?',[idQuestion]);
        
    }
      //EDIT question
      static update(questionText,Marks,idTest,idQuestion) {
      
        return db.execute('UPDATE question SET  questionText = ?,Marks = ?,idTest =? WHERE idQuestion = ?', 
        [questionText,Marks,idTest,idQuestion]);
      }
      //DELETE question
      static deleteQ(idQuestion) {
        return db.execute('DELETE FROM question WHERE idQuestion = ?',[idQuestion]);
      }
      //Add question
      static save(questionText,Marks,idTest){
        return db.execute('INSERT  INTO question (questionText,Marks,idTest) VALUES (?,?,?)',
        [questionText,Marks,idTest]);
    }
  


    
}