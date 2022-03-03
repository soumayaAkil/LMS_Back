const db = require('../../Config/dbConfig');
/**
 *
 */


module.exports = class test {
    constructor(duration,date,idChapitre,published){
        duration=this.duration;
        date=this.date;
        idChapitre=this.idChapitre;
        published=this.published;
       
    }

    static delete(idTest) {
        return db.execute('DELETE FROM test WHERE idTest = ?', [idTest]);
      }
      //Edit test
      static update(duration,date,idChapitre,published,idTest) {
        return db.execute('UPDATE test SET duration  = ?, date = ?, idChapitre =?, published =? WHERE idTest = ?', 
        [duration,date,idChapitre,published,idTest]);
      }
      //test detail
      static testDetails(idTest){
        return db.execute ('SELECT chapitre.name,chapitre.semester,test.date ,test.duration  FROM chapitre JOIN test ON chapitre.id_chapitre = test.idChapitre  WHERE idTest = ?',[idTest]);
    }
    static testDetailsQ(idTest){
        return db.execute('SELECT question.idQuestion,question.questionText,reponse.idReponse,reponse.answerText From question JOIN test  ON question.idTest = test.idTest Join reponse ON reponse.idQuestion = question.idQuestion WHERE test.idTest = ?',[idTest]);

    }
    //list test by id chapitre
    static findTestByChapitre(id_chapitre){
        
        return db.execute(
            'SELECT * FROM test WHERE idChapitre = ?',[id_chapitre]);
        
    }
    //findTestById
    static findTestById(idTest){
        return db.execute(
            'SELECT * FROM test WHERE idTest = ?',[idTest]);
        
    }
    //Add test
    static save(duration,date,idChapitre,published){
        return db.execute('INSERT  INTO test (duration,date,idChapitre,published) VALUES (?,?,?,?)',
        [duration,date,idChapitre,published]);
    }
}