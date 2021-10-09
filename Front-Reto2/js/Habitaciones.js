function consultar() {

    $.ajax({
        url: 'https://g542060ac2c1457-gastosbd1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/room/room',
        type: 'GET',
        dataType: 'JSON',

        //success - propiedad
        //function(json) - funcion anonima
        success: function(json) {
            // capa div - resultado
            $("#resultado").empty();
            for (i = 0; i < json.items.length; i++) {
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[i].id + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
                $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[i].room + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
                $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[i].stars + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
                $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[i].category_id + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
                $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[i].description + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
                $("#miResultado").append('<td><input type="button" value="BORRAR" onclick="eliminar(' + json.items[i].id + ')"></td>');
                $("#resultado").append("</tr>")
            };
            console.log(json);
        },
        error: function(xhr, status) {
            alert('Ha sucedido un problema, ' + xhr.status);
        },
        complete: function(xhr, status) {
            //status - es el estado de codigo
            alert('Petición realizada, ' + xhr.status);
        }
    });
}


function registrar() {

    $.ajax({
        url: 'https://g542060ac2c1457-gastosbd1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/room/room',
        data: {
            room: $("#room").val(),
            stars: $("#stars").val(),
            category_id: $("#category_id").val(),
            description: $("#description").val()
        },
        type: 'POST',
        dataType: 'json',
        success: function(json, textStatus, xhr) {
            console.log(json);
        },
        error: function(xhr, status) {
            alert('Ha sucedido un problema ' + xhr.status);
        },
        complete: function(xhr, status) {
            alert('Petición realizada ' + xhr.status);
            limpiarFormulario();
        }
    });
}

function editar() {
    let myData = {
        id: $("#id").val(),
        room: $("#room").val(),
        stars: $("#stars").val(),
        category_id: $("#category_id").val(),
        description: $("#description").val()
    }
    let dataTosend = JSON.stringify(myData);
    $.ajax({
        url: 'https://g542060ac2c1457-gastosbd1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/room/room',
        type: "PUT",
        data: dataTosend,
        contentType: "application/JSON",
        dataType: 'JSON',
        success: function(respuesta) {
            $("#resultado").empty();
            $("#id").val("");
            $("#room").val("");
            $("#stars").val("");
            $("#category_id").val("");
            $("#description").val("");
            consultar();
        },
        error: function(xhr, status) {
            alert('Ha sucedido un problema' + xhr.status);
        },
        complete: function(xhr, status) {
            alert('Petición realizada' + xhr.status);
            limpiarFormulario();
        }
    });
}


function eliminar(idElemento) {
    let myData = {
        id: idElemento.val()
    }
    let dataToSend = JSON.stringify(myData)
    $.ajax({
        url: 'https://g542060ac2c1457-gastosbd1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/room/room',
        type: 'DELETE',
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function(repuesta) {
            $("#resultado").empty();
            consultar();
            console.log(json);
            console.log("id", dataToSend)
            debugger
        },
        error: function(xhr, status) {
            alert('ha sucedido un problema' + xhr.status);
        },
        complete: function(xhr, status) {
            alert('Petición realizada ' + xhr.status);
            limpiarFormulario();
        }
    });
}

function buscarPorID(id) {
    $.ajax({
        url: 'https://g542060ac2c1457-gastosbd1.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/room/room/' + id.val(),
        dataType: 'json',
        type: 'GET',
        success: function(json) {
            $("#resultado").empty();
            $("#resultado").append("<tr>");
            $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[0].id + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
            $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[0].room + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
            $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[0].stars + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
            $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[0].category_id + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
            $("#resultado").append("<td>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + json.items[0].description + "&nbsp;&nbsp;&nbsp;&nbsp;" + "</td>");
            $("#resultado").append("</tr>");

            //$("#resultado").append( json.items[0].room+"&nbsp;&nbsp;&nbsp;&nbsp;"
            //+json.items[0].stars+"&nbsp;&nbsp;&nbsp;&nbsp;"
            //+json.items[0].category_id+"&nbsp;&nbsp;&nbsp;"
            //+json.items[0].description);
            console.log(json);
            console.log("id", id.val())
            debugger
        },
        error: function(xhr, status) {
            alert('ha sucedido un problema' + xhr.status);
        },
        complete: function(xhr, status) {
            alert('Petición realizada ' + xhr.status);
        }
    });
}


function limpiarFormulario() {
    $("#room").val("");
    $("#stars").val("");
    $("#category_id").val("");
    $("#description").val("");
}

function soloLectura() {
    $("#id").prop("readonly", false);
}