PerfilUsuarios = {

    PerfilCambiarClave: function(id_usuario, clave){
        var seguridad_usuarios = new Models.Usuarios({id: id_usuario, clave: clave});
        self = this;
        seguridad_usuarios.save({},{
            /*success: function(modelo, response){
                alert('Clave cambiada con exito');
            },

            error: function(jqXHR, status, errorThrown){
                alert('No se pudo cambiar la clave, intente ,mas tarde')
                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
            }*/
        }).done(function(data){
            console.log(data);
            alert(data.mensaje);
            this.NotificarSms(id_usuario)
        });
    },

    NotificarSms: function(id_usuario){
       // 
    }
}
