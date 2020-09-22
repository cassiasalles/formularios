window.onload = onLoad;

var row_item;

function onLoad() {
    // carregando formularios
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

    // setanto header
    // verificando se o usuario esta logado
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/formulario";
    }
    // setando nome do usuario na barra
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
    // ao clicar sobre uma linha da tabela
    $("#formTable").on("click-row.bs.table", function (res) {
        row_item = res["handleObj"]["handler"]["arguments"][1] 
        localStorage.setItem('form_item', row_item._id );
        localStorage.setItem('form_title', row_item.title );     
        window.location.href = "/formulario/answered/answers.html";
    });
}