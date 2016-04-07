// Vista para el Editar Perfil:
var VistaPerfil = Backbone.View.extend({
    /**/
    obtenerPlantilla: function(idElemento){
        return plantilla(idElemento);
    },

    initialize: function(){
        this.render();
    },

    events:{
        'click #btnIniciarSesion': 'iniciarSesion',

        'click #olvidoClave': 'olvidoClave',

        'click #registrate': 'registrarNuevo',
    },

    iniciarSesion: function(){
        var inUsuario = $('#inputEmail').val();
        var inClave = $('#inputPassword').val();
        self = this;

        dataEnviar = {usuario: inUsuario, clave: inClave}
        $.ajax({
            url:'iniciarSesion',
            type:"POST",
            data:JSON.stringify(dataEnviar),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(response){
                var estado = response.status
                var usuarioId = response.mensaje
                if( estado ){
                    var modeloDatosUsuario = new App.Models.DatosUsuario({
                        id: usuarioId
                    });

                    modeloDatosUsuario.fetch({
                        success: function(modelResponse){
                            var loginOk = self.obtenerPlantilla('sesionActivaPlantilla');
                            self.plantillaLogin = loginOk( modelResponse.toJSON() );
                            self.render();
                            alert('Sesion iniciada con Exito');
                        },

                        error: function(modelResponse){
                            alert('Error al hacer fetch');
                        }
                    });
                }
                else{
                    alert(usuarioId);
                }
            }
        })
    },

    render: function(){
        this.$el.html(this.plantillaLogin);
    return this;
    }

});
