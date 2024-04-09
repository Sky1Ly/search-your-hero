$(document).ready(function () {
    let token = 4905856019427443

    $("button").on("click", function () {
        let data = $("#inputSearch").val()
        if (isNaN(data)) {
            alert("El dato ingresado no es un número, intentelo nuevamente")
        } else {
            if(data < 1 || data > 731) {
                alert("El número ingresado debe estar entre 1 y 731")
            } else {
                event.preventDefault()
                searchHero(token, data)
                $("#inputSearch").val("")
            }
        }
    })

    

    function searchHero (token, id) {
        $.ajax({
            type: "GET",
            url: `https://superheroapi.com/api.php/${token}/${id}`,
            dataType: "json",
            success: function (response) {
                console.log(response)
            }
        });
    }
})