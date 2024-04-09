$(document).ready(function () {
    let token = 4905856019427443

    searchHero(token, 731)

    

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