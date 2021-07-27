var comentarios = db.collection('premiacao-2020-comentarios');
comentarios.orderBy("data_criacao").limit(3)

$(document).ready(function() {

    console.log('running...');
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', function() {
                window.location = '#comentarios';
                Swal.close()
            })
        }
    })


    setTimeout(function() {
        Toast.fire({
            icon: 'success',
            title: 'Não se esqueça de publicar um comentário!'
        })
    }, 5000);

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

        comentarios.where('deletado', '==', 0).where('teste', '==', 0).where('verificado', '==', 1).orderBy('data_criacao').get().then(function(e) {
            console.log(e.docs);
            var html = "";
            if (e.docs.length === 0) {
                html += "<p class='text-center'>Seja o primeiro a publicar!</p>"
            } else {
                e.docs.forEach(item => {
                    var item = item.data();
                    var data_criacao = item.data_criacao;
                    // console.log(new Date(data_criacao.seconds * 1000));
                    data_criacao = new Date(data_criacao.seconds * 1000);
                    console.log(data_criacao.getMonth() + 1);
                    var mes = data_criacao.getMonth() + 1;
                    var dia = data_criacao.getDate();
                    if (mes == 1) {
                        mes = '01';
                    }
                    if (dia < 10) {
                        dia = "0" + dia;
                    }
                    html += '<div class="card mb-15">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.nome + '</h5>';
                    html += '<h6 class="card-subtitle mb-2 text-muted">' + dia + '/' + mes + '/' + data_criacao.getFullYear() + '</h6>';
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
    }).queue([{
            input: 'text',
            title: 'Seu nome',
            required: "required",
            validationMessage: "Oops, algo errado com seu nome. Está correto mesmo?"
        },
        {
            input: 'text',
            title: 'Seu email',
            text: "Opcional",
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
            }).then(function() {
                Swal.hideLoading();
                Swal.fire("Sucesso!", "Seu comentário foi enviado com sucesso! Em breve ele aparecerá na página!", "success");
            });
        }
        $('.swal2-input').attr('required', 'required');
    });
    $('.swal2-input').attr('required', 'required');
}