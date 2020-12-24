$(document).ready(function () {
    console.log('running...');

    $("#comentarios-form").submit(function (e) {
        e.preventDefault();
        Swal.showLoading();
        $.ajax({
            method: "POST",
            url: "https://api-elton.herokuapp.com/kumonPremiacao/sendComentario",
            data: $(this).serialize(),
            success: function (data) {
                console.log(data);
                Swal.fire("Sucesso!","Seu comentário foi enviado com sucesso! Em breve ele aparecerá na listagem!", "success");
                Swal.hideLoading();
            }
        });
    });


    function getComentarios(){
        $.ajax({
            method: "GET",
            url: "https://api-elton.herokuapp.com/kumonPremiacao/getComentarios",
            success: function (data) {
                console.log(data);
                var html = "";
                html += '<div class="card">';
                html +='<div class="card-body">';
                html += '<h5 class="card-title">Card title</h5>';
                html += '<h6 class="card-subtitle mb-2 text-muted">24/12/2020</h6>';
                html += '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card content.</p>';
                html += '</div>'
                html += '</div>'

                $("#lista-comentarios").html(html);
            }
        });
    }

    getComentarios();
});