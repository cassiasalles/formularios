const Form = require('../models/Form');

module.exports = {
    // listar os formularios
    async index(request, response) {
        // buscando formulários
        const form_ = await Form.find();

        return response.json(form_)
    },
}
