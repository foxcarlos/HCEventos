PerfilUsuarios = {
    PerfilCambiarClave: function(id_usuario, clave){
        var seguridad_usuarios = new Models.Usuarios({id: id_usuario, clave: clave});
        self = this;
        seguridad_usuarios.save({},{
            async: false,  // false para que pueda retornar un valor al final
            success: function(modelo, response){
                self.devolver = response.status;
            },

            error: function(jqXHR, status, errorThrown){
                self.devolver = 1;
                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
            }
        });
        return this.devolver
    }
}
