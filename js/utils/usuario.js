Usuario = {
    IniciarSesion: function(json_usuario_clave){
        self = this;
        $.ajax({
            async: false,
            url:'iniciarSesion',
            type:"POST",
            data:JSON.stringify(json_usuario_clave),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(response){
                self.a = response;
            }
        })
        return this.a
    },

    BuscarUsuarioId: function(idBuscar){
        var modeloDatosUsuario = new App.Models.DatosUsuario({
            id: idBuscar
        });

        self = this;
        modeloDatosUsuario.fetch({
            async: false,
            success: function(model){
                self.hola = model.toJSON();
                console.log(self.hola);
            },

            error: function(errorResponse){
                self.modeloDevolver = errorResponse;
                alert('Error al hacer fetch');
            }
        });
        return this.hola  // modeloDevolver
    }
}

