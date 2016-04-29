PerfilUsuarios = {

    PerfilCambiarClave: function(id_usuario, clave, nombre_usuario){

        var seguridad_usuarios = new Models.Usuarios({id: id_usuario, clave: clave});
        seguridad_usuarios.save({},{
        }).done(function(data){
            alert(data.mensaje);
            if( data.status ){
                mensajeEnviar = nombre_usuario + ' Su contraseña de "Eventos Hospital Coromoto" se ha cambiado con exito'
                Notificar.Sms(id_usuario, mensajeEnviar)
            }
        });
    },

    otro: function(){
    }
}
