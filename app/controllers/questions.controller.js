const fsPromises = require('fs').promises;
const BodyHelper = require('../helpers/body.helper');
const QuestionsValidator = require('../helpers/questions.validator');
const path = require('path');

class QuestionsController {

    static getRandomQuestion(req, res) {
        res.end('Question');
    }

    static async createQuestion(req, res) {
        const body = await BodyHelper.getBody(req);
        
        const err = QuestionsValidator.validateCreateQuestion(body);
        if ( err ) {
            res.statusCode = err.errCode;
            return res.end(err.message);
        }

        const filePath = path.join(__dirname, '../models/questions.model.csv');
        await fsPromises.appendFile(filePath, `\n"${body.question}";"${body.answer}"`);
        
        res.statusCode = 201;
        res.end();
    }

}

module.exports = QuestionsController;
