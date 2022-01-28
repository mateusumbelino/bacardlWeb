function sendLayout()
{
    const ajaxUrl = "http://127.0.0.1:8000/junk";

    let payload = async function(){
        return await getLayoutObject()
    }

    payload().then(function(data){
        console.log(data)
        $.ajax({
            url : ajaxUrl,
            type : "POST",
            data : data,
            processData: false,
            contentType: 'application/json',
        }).done(function(response){
            console.log(response.status)
        }).fail(function(response){
            console.log(response.status)
        }).always(function(){
            alert("AJAX request FUNCIONOU NUNCA DUVIDEI!");
        });
    });
}