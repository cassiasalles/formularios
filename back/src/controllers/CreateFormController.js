const Form = require('../models/Form');

module.exports = {
    //criando um novo usuario
    async store(request, response) {
        // pegando valores recebidos
        const { user, date, title, questions } = request.body;
        // cadastrando usuario
        form_ = await Form.create({
            user,
            date,
            title,
            questions,
        });
        response.send({status: true})
    }
}