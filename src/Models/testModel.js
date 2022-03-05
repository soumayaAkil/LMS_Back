const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class test {
    constructor(duration,date,id_chapitre,published){
        duration=this.duration;
        date=this.date;
        id_chapitre=this.id_chapitre;
        published=this.published;
       
    }

    static delete(idTest) {
        return db.execute('DELETE FROM test WHERE idTest = ?', [idTest]);
      }
      //Edit test
      static update(duration,date,id_chapitre,published,idTest) {
        return db.execute('UPDATE test SET duration  = ?, date = ?, id_chapitre =?, published =? WHERE idTest = ?', 
        [duration,date,id_chapitre,published,idTest]);
      }
      //test detail
      static testDetails(idTest){
        return db.execute ('SELECT chapitre.name,chapitre.semester,test.date ,test.duration  FROM chapitre JOIN test ON chapitre.id_chapitre = test.idChapitre  WHERE idTest = ?',[idTest]);
    }
    static testDetailsQ(idTest){
        return db.execute('SELECT question.idQuestion,question.questionText,question.Marks,reponse.idReponse,reponse.answerText From question JOIN test  ON question.idTest = test.idTest Join reponse ON reponse.idQuestion = question.idQuestion WHERE test.idTest = ?',[idTest]);

    }
    //list test by id chapitre
    static findTestByChapitre(id_chapitre){
        
        return db.execute(
            'SELECT * FROM test WHERE id_chapitre = ?',[id_chapitre]);
        
    }
    //findTestById
    static findTestById(idTest){
        return db.execute(
            'SELECT * FROM test WHERE idTest = ?',[idTest]);
        
    }
    //Add test
    static save(duration,date,id_chapitre,published){
        return db.execute('INSERT  INTO test (duration,date,id_chapitre,published) VALUES (?,?,?,?)',
        [duration,date,id_chapitre,published]);
    }
      static fetchByIdTest(idTest) {
        return db.execute('SELECT * FROM test WHERE idTest = ?',[idTest]);
      }
      //Publish test
       static publish_test(idTest){
        return db.execute ('UPDATE test SET published = "1" WHERE idTest = ?',[idTest]);
    }
    //get date 
    static getdate(idTest){
      return db.execute ('SELECT date FROM test  WHERE idTest = ?',[idTest]);
  }

    //getponderationdequestion
    static getponderation(idQuestion){
        return db.execute(
            'SELECT Marks FROM question WHERE  idQuestion = ?',[idQuestion]);     
    }
}