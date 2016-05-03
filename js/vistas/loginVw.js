var Vista = Vista || {};

Vista.Login = Backbone.View.extend({

    verificaSesion: function(usuario){
        /*Este Metodo permite ir al backend y buscar en los cookies
         si el usuario tiene una sesion abierta, dependiendo de esto
         muestra una plantilla HTML */

        if( !usuario ){
            htmlSesionInactiva = Utils.BuscarHtml('tplSesionInactiva');
            this.plantillaLogin = htmlSesionInactiva;
            this.render();
        }
        else{
            self.plantillaLogin = '<a>sesionActiva</a>';
        }
    },

    initialize: function(){
        $.getJSON('consultarSesion', function(respuesta){
            this.user = respuesta.usuario;
        });
        this.verificaSesion(this.user);
    },

    events:{
        'click #btnIniciarSesion': 'iniciarSesion',

        'click #olvidoClave': 'olvidoClave',

        'click #registrate': 'registrarNuevo',

        'click #editarPerfil': 'perfil'
    },

    perfil: function(){
        var miVistaPerfil = new Vista.Perfil({model: this.modelo});
    },

    iniciarSesion: function(){
        var inUsuario = $('#inputEmail').val();
        var inClave = $('#inputPassword').val();

        dataEnviar = {usuario: inUsuario, clave: inClave}
        response = Usuario.IniciarSesion(dataEnviar)

        var estado = response.status;
        var usuarioId = response.mensaje;

        if( estado ){
            this.modelo = Usuario.BuscarUsuarioId(usuarioId);
            htmlSesionActiva = Utils.BuscarHtml('tplSesionActiva');
            var loginOk =  _.template(htmlSesionActiva.trim());
            this.plantillaLogin = loginOk( this.modelo );
            this.render();
        }
        else{
            alert('Clave Incorrecta');
        }
    },

    render: function(){
        this.$el.html(this.plantillaLogin);
        return this;
    }

});

