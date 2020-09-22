const User = require("../models/User");
const jwt  = require('jsonwebtoken');
const authConfig = require("../config/auth.json");

module.exports = {
    //autenricação
    async index(request, response) {
        // pegando valores recebidos
        const {user, password} = request.body
        // buscando usuario
        const user_ = await User.findOne({user, password })
        
        if(!user_){
            return response.status(400).send({status:"false"})
        }              
        // criando token
        const token = jwt.sign({ user }, authConfig.secret, {
            expiresIn: 86400,
        })

        response.send({user, token, status: true})
    }
    
}