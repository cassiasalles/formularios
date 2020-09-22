window.onload = onLoad;

var requestForms;
var modalTitle;
var item_form_id;
var questions;
var longitude;
var latitude;

function onLoad() {
    // carregando formulários
    fetch("http://localhost:3333/listforms", {
        "method": "GET",
        "headers": {}
    })
        .then((response) => response.json()).then(response => {
            console.log(response);            
            requestForms = response;
            tableFunction();
        })
        .catch(err => {
            console.error(err);
        });

    // pegando geolocation
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocalização não é suportada por este browser.");
            longitude = 0;
            latitude = 0;
        }
    }
    // setando geolocation
    function showPosition(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
    }

    // setanto header
    // verificando se o usuario esta logado
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/formulario";
    }
    // setando usuario na barra
    document.getElementById("headerUser").innerHTML = localStorage.getItem("user");

    // função de logout
    $("#logout").click(function () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = "/formulario";
    })
}

function tableFunction() {

    $('#formTable').bootstrapTable({
        pagination: true,
        search: true,
        columns: [{
            field: 'title',
            title: 'Título'
        }, {
            field: 'user',
            title: 'Criado por'
        }, {
            field: 'date',
            title: 'Data de criação',

        }, {
            field: 'questions',
            title: 'Perguntas',
            visible: false,
        }, {
            field: '_id',
            title: 'id',
            visible: false,
        }],
        data: requestForms,
        theadClasses: "thead-light",
        formatSearch: function () {
            return 'Pesquisar...'
        }
    });

    $("#formTable").on("click-row.bs.table", function (res) {
        var row_item = res["handleObj"]["handler"]["arguments"][1]

        // Setando valores do item
        modalTitle = row_item.title;
        item_form_id = row_item._id;
        questions = row_item.questions;

        // setando as perguntas
        for (item = 0; item < row_item.questions.length; item++) {
            $('#contentModal').append($("<label class='font-16 font-bold'>"+row_item.questions[item]+"</label>"));
            $('#contentModal').append($("<input type='text' class='form-control bottom-8'>")
                .attr("id", 'question' + (item + 1)));
        }

        // adicionando o conteudo do modal
        $('#answerModal').on('show.bs.modal', function (event) {
            var modal = $(this)
            modal.find('.modal-title').text(modalTitle)
        })

        // quando fechar o modal apagar seu conteudo
        $('#answerModal').on('hide.bs.modal', function (event) {
            var modal = $(this)
            $('#contentModal').empty()
        })

        // exibindo o modal
        $('#answerModal').modal('show');

    });
}

// ao enviar 
$('#sendFormBtn').click(function () {
    // setando informações
    var user = localStorage.getItem("user");
    var date = new Date();
    var title = modalTitle;
    var answers = [];
    var form_id = item_form_id;

    // listando as respostas
    for (i = 0; i < item; i++) {
        answers[i] = $('#question' + (i + 1)).val();
    }

    // setando conteudo no modal
    $('#informationModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        modal.find('.modal-body').text(informationMessage)
    })

    // enviando as respostas
    fetch("http://localhost:3333/answerform", {
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "user": user,
            "date": date,
            "title": title,
            "questions": questions,
            "answers": answers,
            "form_id": form_id,
            "longitude": longitude,
            "latitude": latitude,
        })
    })
        .then((response) => response.json()).then(response => {
            // verificando resposta
            if (response.status == true) {
                $('#answerModal').modal('hide');
                informationMessage = "Resposta enviada com sucesso!";
                $('#informationModal').modal('show');
            } else {
                $('#answerModal').modal('hide');
                informationMessage = "Erro ao enviar resposta";
                $('#informationModal').modal('show');
                console.log(response)
            }

        })
        .catch(err => {
            informationMessage = "Erro ao criar formulário";
            $('#informationModal').modal('show');
            console.error(err);
        });

});