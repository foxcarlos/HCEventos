PerfilUsuarios = {
    PerfilCambiarClave: function(id_usuario, clave){
        var todoBien = true;
        var seguridad_usuarios = new Models.Usuarios({id: id_usuario, clave: clave});
        self = this;

        seguridad_usuarios.save({
            async: false,
            success: function(response){
                //self.todoBien = ;
                console.log('bien');
            },

            error: function(jqXHR, status, errorThrown){
                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
            }
        });
    }
}
