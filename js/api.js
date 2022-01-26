function sendLayout()
{
    console.log("CHEGUEI AQUI")

    console.log("criando form data")
    var formData = new FormData();
    formData.append("layout", getLayoutObject())

    console.log("meu form-data")
    console.log(formData)
                
    var ajaxUrl = "https://bacardiweb.herokuapp.com/layout";
    
    $.ajax({
        url : ajaxUrl,
        type : "POST",
        data : formData,
        // both 'contentType' and 'processData' parameters are
        // required so that all data are correctly transferred
        contentType : false,
        processData : false
    }).done(function(response){
        console.log(response.status)
    }).fail(function(){
        // Here you should treat the http errors (e.g., 403, 404)
        console.log(response.status)
    }).always(function(){
        alert("AJAX request FUNCIONOU NUNCA DUVIDEI!");
    });
}