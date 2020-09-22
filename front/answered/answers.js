window.onload = onLoad;

var answer_req;
var modalTitle;
var questions;
var user;
var date;
var geoLocation;

function onLoad() {
    // pegando o id e titulo do formulario selecionado na answered_forms
    var form_item = localStorage.getItem('form_item');
    var form_title = localStorage.getItem('form_title');
    // setando o titulo do form na pagina
    document.getElementById("formTitle").innerHTML = form_title;
    
    // carregando as resposta do formulario
    fetch("http://localhost:3333/answerlist", {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "form_id": form_item
        })
    })
        .then((response) => response.json()).then(response => {
            if (response.status == true) {
                answer_req = response.answers_;
            }
            tableFunction();
        })
        .catch(err => {
            console.error(err);
        });
        
    // setanto header
    // verificando se o usuario esta logado
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/formulario";
    }
    // setando nome do usuario na barra
    document.getElementById("headerUser").innerHTML = localStorage.getItem("user");
    // função de log out
    $("#logout").click(function () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = "/formulario";
    })
}

function tableFunction() {

    $('#answersTable').bootstrapTable({
        pagination: true,
        search: true,
        columns: [{
            field: 'user',
            title: 'Respondido por'
        }, {
            field: 'date',
            title: 'Data de envio',
        }],
        data: answer_req,
        theadClasses: "thead-light",
        formatSearch: function () {
            return 'Pesquisar...'
        }
    });

    $("#answersTable").on("click-row.bs.table", function (res) {
        row_item = res["handleObj"]["handler"]["arguments"][1];

        // pegando valores do item selecionado
        modalTitle = row_item.title;
        user = row_item.user;
        date = row_item.date;
        geoLocation = row_item.location.coordinates;
        questions = row_item.questions;
        answers = row_item.answers;
       
        // adicionando a div do modal os valores
        $("#answersDiv").append($("<label class='font-16 font-bold'>Usuário: </label><label class='font-14'> "+user+"</label><br>"));
        $("#answersDiv").append($("<label class='font-16 font-bold'>Data de envio: </label><label class='font-14'> "+date+"</label><br>"));
        $("#answersDiv").append($("<label class='font-16 font-bold'>Geolocalização: </label><label class='font-14'> "+geoLocation+"</label><br>"));
        $("#answersDiv").append($("<hr>"));
        $("#answersDiv").append($("<label class='font-18 font-bold'>Perguntas e respostas </label><br>"));
        for (item = 0; item < questions.length; item++){
            $("#answersDiv").append($("<label class='font-16 font-bold'>"+questions[item] +": </label><label class='font-14'> "+answers[item]+"</label><br>"));
        }

        // setando o conteudo do modal
        $('#answerModal').on('show.bs.modal', function (event) {
            var modal = $(this)
            modal.find('.modal-title').text(modalTitle)
        })

        // quando fechar o modal apagar seu conteudo
        $('#answerModal').on('hide.bs.modal', function (event) {
            var modal = $(this);
            document.getElementById("answersDiv").innerHTML = " "
        })
        // exibindo modal
        $('#answerModal').modal('show');
    });
}