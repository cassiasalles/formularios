const { index } = require('../models/utils/PointSchema');
const Answer = require('../models/Answer');

module.exports = {
    // salvando resposta de um formulario
    async store(request, response) {
        // pegando os dados recebidos
        const { user, date, title, questions, answers, form_id, latitude, longitude } = request.body;

        // setando localização
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        // subindo para o banco
        answer_ = await Answer.create({
            user,
            date,
            title,
            questions,
            answers,
            form_id,
            location
        });
        response.send({status: true})
    }
}