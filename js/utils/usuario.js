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
        var modeloDatosUsuario = new Models.DatosUsuario({
            id: idBuscar
        });

        self = this;
        modeloDatosUsuario.fetch({
            async: false,
            success: function(model){
                self.hola = model.toJSON();
                console.log(self.hola);
            },

            error: function(jqXHR, status, errorThrown){
                console.log(jqXHR);
                console.log(status);
                console.log(errorThrown);
            }
        });
        return this.hola  // modeloDevolver
    }
}

