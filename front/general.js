window.onload = initialFunction;
function initialFunction() {
    // verificando se o usuario esta logado
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/formulario";
    }
    // setando nome do usuario na barra
    document.getElementById("headerUser").innerHTML = localStorage.getItem("user");
}

$("#logout").click(function () {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = "/formulario";
})
