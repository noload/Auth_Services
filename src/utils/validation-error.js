const AppError = require('./error-handler');

const {StatusCodes} = require('http-status-codes')

class ValidationError extends AppError{
    constructor(error){
        let erroName = error.name;
        let explanation = [];
        error.errors.forEach(element => {
            explanation.push(element.message);
        });
        super(erroName,
            "Not abble to validate the datasent in the request",
            explanation,
            StatusCodes.BAD_REQUEST
            )
    }
}

module.exports = ValidationError