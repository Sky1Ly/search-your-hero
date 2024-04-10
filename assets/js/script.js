$(document).ready(function () {
    let token = 4905856019427443
    let dataPoints = []

    //CanvasJS
    let options = {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: "Powerstats"
        },
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "pie",
                dataPoints: dataPoints
            }
        ]
    }

    //El evento clic del botón debe ir async ya que al usar una función externa para el llamado de la API,
    //Esta debe ser async y al llamarla igual debe ser async, por ende; el async del boton es necesario para
    //que espere la respuesta de la API
    $("button").on("click", async function () {
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

                //LLena información al dataPoints con los key y powerstats que tiene el super heroe
                for (const key in arrayHero.powerstats) {
                    dataPoints.push({
                        label: key,
                        y: arrayHero.powerstats[key]
                    })
                }

                //Pinta en pantalla la card del hero (.append aggrega el elemento al final)
                $("#contenido").html(`
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-3">
                                <img src="${arrayHero.image.url}" class="img-fluid rounded-start" alt="...">
                            </div>

                            <div class="col-md-3">
                                <div class="card-header">
                                    <h3 class="card-title">${arrayHero.name}</h3>
                                </div>

                                <div class="card-body">
                                    <p class="card-text">Connections: ${arrayHero.connections['group-affiliation']}</p>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">First appearance: ${arrayHero.biography['first-appearance']}</li>
                                        <li class="list-group-item">Occupation: ${arrayHero.work.occupation}</li>
                                        <li class="list-group-item">Height: ${arrayHero.appearance.height[1]}</li>
                                    </ul>
                                </div>

                                <div class="card-footer text-body-secondary">
                                    Publisher: ${arrayHero.biography.publisher}
                                </div>
                            </div>

                            <div id='canvas' class='col-md-6'></div>
                        </div>
                    </div>
                `)
                //Renderizado del gráfico
                let chart = new CanvasJS.Chart("canvas", options);
                chart.render();

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