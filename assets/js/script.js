$(document).ready(function () {
    let token = 4905856019427443

    //El evento clic del botón debe ir async ya que al usar una función externa para el llamado de la API,
    //Esta debe ser async y al llamarla igual debe ser async, por ende; el async del boton es necesario para
    //que espere la respuesta de la API
    $("button").on("click",async function () {
        let data = $("#inputSearch").val()

        //Validación si el dato es un número
        if (isNaN(data)) {
            alert("El dato ingresado no es un número, intentelo nuevamente")
        } else {
            //Validación de rango de número
            if (data < 1 || data > 731) {
                alert("El número ingresado debe estar entre 1 y 731")
            } else {
                event.preventDefault()

                //arrayHero tiene el array de la respuesta de la API y debe de llamarse con await
                let arrayHero = await searchHero(token, data)
                console.log(arrayHero)

                //Pinta en pantalla la card del hero (.append aggrega el elemento al final)
                $("#contenido").html(`
                    <div class="card" style = "width: 18rem;" >
                        <img src="${arrayHero.image.url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3 class="card-title">${arrayHero.name}</h3>
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



    async function searchHero(token, id) {
        try {
            response = await $.ajax({
                type: "GET",
                url: `https://superheroapi.com/api.php/${token}/${id}`,
                dataType: "json"
            });
    
            return response

        } catch (error) {
            throw error
        }
        
    }
})