var comentarios = db.collection('premiacao-2020-comentarios');
$(document).ready(function () {

    console.log('running...');

    // $("#comentarios-form").submit(function (e) {
    //     e.preventDefault();
    //     Swal.showLoading();

    //     var formData = {};
    //     $.each($(this).serializeArray(), function (_, kv) {
    //         formData[kv.name] = kv.value;
    //     });

    //     comentarios.add({
    //         nome: formData.nome,
    //         email: formData.email,
    //         texto: formData.texto,
    //         data_criacao: new Date(),
    //         verificado: 0,
    //         deletado: 0
    //     }).then(function () {
    //         Swal.hideLoading();
    //         Swal.fire("Sucesso!", "Seu comentário foi enviado com sucesso! Em breve ele aparecerá na listagem!", "success");
    //     });

    // });


    function getComentarios() {

        comentarios.where('deletado', '==', 0).where('teste', '==', 0).where('verificado', '==', 1).get().then(function (e) {
            console.log(e.docs);

            var html = "";
            if (e.docs.length === 0) {
                html += "<p class='text-center'>Seja o primeiro a comentar!</p>"
            } else {
                e.docs.forEach(item => {
                    var item = item.data();
                    var data_criacao = item.data_criacao;
                    // console.log(new Date(data_criacao.seconds * 1000));
                    data_criacao = new Date(data_criacao.seconds * 1000);
                    html += '<div class="card mb-15">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.nome + '</h5>';
                    html += '<h6 class="card-subtitle mb-2 text-muted">' + data_criacao.getDate() + '/' + data_criacao.getMonth() + '/' + data_criacao.getFullYear() + '</h6>';
                    html += '<p class="card-text">' + item.texto + '</p>';
                    html += '</div>';
                    html += '</div>';
                });
            }
            $("#lista-comentarios").html(html);
        })
    }
    getComentarios();

});

function fazerComentario() {
    Swal.mixin({
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Próximo',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
    }).queue([
        {
            input: 'text',
            title: 'Seu nome',
            required: "required",
            validationMessage: "Oops, algo errado com seu nome. Está correto mesmo?"
        },
        {
            input: 'email',
            title: 'Seu email',
            attributes: {
                required: 'required'
            },
            validationMessage: "Oops, algo errado com seu email. Está correto mesmo?",
        },
        {
            input: 'text',
            attributes: {
                required: 'required'
            },
            validationMessage: "Oops, algo errado com seu texto. Está correto mesmo?",
            title: 'Seu comentário!'

        }
    ]).then((result) => {
        if (result.value) {
            answers = result.value;
            Swal.showLoading();

            comentarios.add({
                nome: answers[0],
                email: answers[1],
                texto: answers[2],
                data_criacao: new Date(),
                verificado: 0,
                deletado: 0,
                teste: 0
            }).then(function () {
                Swal.hideLoading();
                Swal.fire("Sucesso!", "Seu comentário foi enviado com sucesso! Em breve ele aparecerá na página!", "success");
            });
        }
        $('.swal2-input').attr('required', 'required');
    });
    $('.swal2-input').attr('required', 'required');
}