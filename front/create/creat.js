// criando nova pergunta
var numberQuestion = 0
$("#newQuestionBtn").click(function () {
    numberQuestion += 1;
    $('#newQuestionDiv').append($("<input type='text' class='form-control top-16' placeholder='Digite a pergunta'>")
        .attr("id", 'question' + numberQuestion));
})

// cadastrando formulário
$("#criarFormularioBtn").click(function () {
    // pegando informações
    var user = localStorage.getItem("user");
    var date = new Date();
    var title = $("#titleField").val();
    var questions = [];

    // listando as perguntas criadas
    for (item = 0; item < numberQuestion; item++) {
        questions[item] = $('#question' + (item + 1)).val()
    }

    // setando conteudo do modal
    $('#informationModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        modal.find('.modal-body').text(informationMessage)
    })

    // enviando formulário
    fetch("http://localhost:3333/create", {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "user": user,
            "date": date,
            "title": title,
            "questions": questions,
        })
    })
        .then((response) => response.json()).then(response => {
            // verificando resposta
            if (response.status == true) {
                informationMessage = "Formulário criado com sucesso!";
                $('#informationModal').modal('show');
                $("#titleField").val(" ");
                document.getElementById("newQuestionDiv").innerHTML = "";
            } else {
                informationMessage = "Erro ao criar formulário";
                $('#informationModal').modal('show');
                console.log(response)
            }
        })
        .catch(err => {
            informationMessage = "Erro ao criar formulário";
            $('#informationModal').modal('show');
            console.error(err);
        });
})