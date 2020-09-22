// ao clicar no botao de cadastrar
$("#registerButton").click(function () {

    // pegando valores da tela
    var user = $("#userField").val();
    var name = $("#nameField").val();
    var password = $("#passwordField").val();
    var passwordConfirmation = $("#passwordConfirmationField").val();
    var informationMessage;

    // setando conteudo do modal
    $('#informationModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        modal.find('.modal-body').text(informationMessage)
    })
    // verificando se foi preenchido todos os campos
    if (user && name && password && passwordConfirmation) {
        // verificando se as senhas sao iguais
        if (password == passwordConfirmation) {
            // cadastrando usuario
            fetch("http://localhost:3333/users?=", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify({
                    "name": name,
                    "user": user,
                    "password": password
                })
            })
                .then((response) => response.json()).then(response => {
                    if (response.status == true) {
                        informationMessage = "Usuário cadastrado com sucesso!";
                        $('#informationModal').modal('show');
                    } else {
                        informationMessage = "Erro ao cadastrar usuário";
                        $('#informationModal').modal('show');
                        console.log(response)
                    }
                })
                .catch(err => {
                    console.error(err);
                });            
        } else {
            informationMessage = "As senhas não conferem! Digite senhas iguais para cadastrar um novo usuário.";
            $('#informationModal').modal('show');
        }
    } else {
        informationMessage = "Preencha todos os campos para cadastrar um novo usuário.";
        $('#informationModal').modal('show');
    }
});

// ao clicar no botao de entrar
$("#loginBtn").click(function () {
    // pegando valores da tela
    var authUser = $("#loginUser").val();
    var authPassword = $("#loginPassword").val();

    // verificando credenciais
    fetch("http://localhost:3333/authenticate", {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "user": authUser,
            "password": authPassword
        })
    })
        .then((response) => response.json()).then(response => {
            // verificando resposta
            if (response.status == true) {
                localStorage.setItem('token', response.token);
                window.location.href = "./home/home.html";
                localStorage.setItem('user', response.user)
            } else {
                informationMessage = "Erro ao tentar entrar.Verifique sua senha. Se o erro persistir, entre em contato com o administrador.";
                $('#informationModal').modal('show');
            }
        })
        .catch(err => {
            console.error(err);
            informationMessage = "Erro ao tentar entrar. Se o erro persistir, entre em contato com o administrador.";
            $('#informationModal').modal('show');
        });
})
