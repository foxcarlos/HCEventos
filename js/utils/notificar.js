Notificar = {

    Sms: function(id, mensaje){
        var id_usuario = id
        var cuerpoMensaje = mensaje

        var request = $.ajax({
            url: "notificar",
            method: "POST",
            data: JSON.stringify({ id : id_usuario, mensaje: cuerpoMensaje }),
            contentType:"application/json; charset=utf-8",
            dataType: "json"
        });

        request.done(function( msg ) {
            //alert( msg.mensaje );
        });

        request.fail(function( jqXHR, textStatus ) {
            // alert( "Peticion SMS fallo: " + textStatus );
        });
    },

    Email: function(id_usuario){
       //
    }
}
