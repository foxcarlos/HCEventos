PerfilUsuarios = {

    PerfilCambiarClave: function(id_usuario, clave, nombre_usuario){

        var seguridad_usuarios = new Models.Usuarios({id: id_usuario, clave: clave});
        seguridad_usuarios.save({},{
        }).done(function(data){
            if( data.status ){
                // data.mensaje devuelve el mensaje desde el backend, pero se manejaran los menasjes desde el front;
                msg = 'Su contraseña se ha cambiado con exito';
                Notificar.modalOk('Felicidades ...', msg, '#modal-success');

                mensajeEnviar1 = nombre_usuario + ' Esta es una confirmación de que la calve de acceso a tu cuenta de Eventos Hospital Coromoto se ha cambiado con Exito.';
                mensajeEnviar2 = nombre_usuario + ' Si no has solicitado cambiar tu clave de acceso, inicia sesión y cambia la clave si es necesario.';
                Notificar.Sms(id_usuario, mensajeEnviar1);
                Notificar.Sms(id_usuario, mensajeEnviar2);
            }
        });
    },

    PerfilTipoIdentidad: function(){
        var Tipos_identidad = new Collections.Tipos_identidad();
        self = this;
        respuesta = Tipos_identidad.fetch({async: false});

        respuesta.always(function(respon){
            console.log('always '+respon.mensaje);
            self.d = respon.mensaje;
        });

        respuesta.done(function(respon){
            console.log('donde ' + respon.mensaje);
            self.d = respon.mensaje;
            return self.d
        });
        respuesta.always(function(respon){
            console.log('always '+respon.mensaje);
            self.d = respon.mensaje;
        });

        console.log(this.d)
        return this.d
    }
}
