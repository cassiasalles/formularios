const User = require('../models/User');

module.exports = {
    //criando um novo usuario
    async store(request, response) {
        const { name, user, password } = request.body;
        // verificando se ja existe o usuario cadastrado no banco
        let user_ = await User.findOne({ user })
        if (!user_) {
            user_ = await User.create({
                name,
                user,
                password,
            });
            return response.send({status: true})
        } else {
            response.send({status:false})
        }
    }
}