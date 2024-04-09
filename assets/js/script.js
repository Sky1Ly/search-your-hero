$(document).ready(function () {
    let token = 4905856019427443

    $("button").on("click", function () {
        let data = $("#inputSearch").val()
        if (isNaN(data)) {
            alert("El dato ingresado no es un número, intentelo nuevamente")
        } else {
            if (data < 1 || data > 731) {
                alert("El número ingresado debe estar entre 1 y 731")
            } else {
                event.preventDefault()
                searchHero(token, data)

                $("#contenido").html(`
                    <div class="card" style = "width: 18rem;" >
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
                `)

                $("#inputSearch").val("")
            }
        }
    })



    function searchHero(token, id) {
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