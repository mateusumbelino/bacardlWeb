
function sendLayout()
{
    const ajaxUrl = "https://bacardiweb.herokuapp.com/layout";

    let payload = async function(){
        return await getLayoutObject()
    }

    payload().then(function(data){
        $.ajax({
            url : ajaxUrl,
            type : "POST",
            data : data,
            processData: false,
            contentType: 'application/json',
        }).done(function(response){
            const image = document.getElementById("preview-img");
            image.src = 'data:image/png;base64,'+response;
        }).fail(function(response){
            console.log(response.status)
        });
    });
}


function sendCards()
{
    const ajaxUrl = "https://bacardiweb.herokuapp.com/create";

    let payload = async function(){
        return await getCardsObject()
    }

    payload().then(function(data){
        fetch(ajaxUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then((response) => {
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
        });
        // $.ajax({
        //     url : ajaxUrl,
        //     type : "POST",
        //     data : data,
        //     processData: false,
        //     contentType: 'application/json',
        // }).done(function(response){
        //     console.log(response);
        // }).fail(function(response){
        //     console.log(response.status)
        // });
    });
}