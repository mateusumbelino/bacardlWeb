
function sendLayout() {
    const ajaxUrl = "https://bacardiweb.herokuapp.com/layout";

    let payload = async function () {
        return await getLayoutObject()
    }

    payload().then(function (data) {
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            data: data,
            processData: false,
            contentType: 'application/json',
            beforeSend: () => {
                Swal.fire({
                    title: 'Processando Layout',
                    text: "Estamos processando o layout, por favor aguarde!",
                    timerProgressBar: true,
                    didOpen: () => {
                      Swal.showLoading()
                    }
                })
            }
        }).done(function (response) {
            const image = document.getElementById("preview-img");
            image.src = 'data:image/png;base64,' + response;
            Swal.close()
        }).fail(function (response) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Alguma coisa deu errado... Por favor contate o suporte!',
            })
            throw new Error(response.statusText)
        });
    });
}


function sendCards() {
    const ajaxUrl = "https://bacardiweb.herokuapp.com/create";

    let payload = async function(){
        return await getCardsObject()
    }

    Swal.fire({
        title: 'Gerando Cartas',
        text: "Estamos processando as cartas e você fará o download em breve!",
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        }
    })

    payload().then(function(data){
        fetch(ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then((response) => {
            Swal.close()
            response.blob().then((blob) => {
                const downloadUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', downloadUrl);
                link.setAttribute('download', 'file');
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
            })
        }).catch(function() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Alguma coisa deu errado... Por favor contate o suporte!',
            })
            throw new Error(response.statusText)
        });
    });
}