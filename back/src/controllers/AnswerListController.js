const Answer = require('../models/Answer');

module.exports = {
    // listando respostas de um formulário
    async index(request, response) {
        // pegando id recebido
        const { form_id } = request.body;
        // consultando respostas para o formulario escolhido
        let answers_ = await Answer.find({ form_id })
        if (answers_) {
            response.send({ status: true, answers_ })
        } else {
            response.send({ status: false })
        }

    },
}
