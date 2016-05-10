var Vista = Vista || {};

Vista.Login = Backbone.View.extend({

    verificaSesion: function(usuario){
        /*Este Metodo permite ir al backend y buscar en los cookies
         si el usuario tiene una sesion abierta, dependiendo de esto
         muestra una plantilla HTML */

        var usuarioId = this.user;

        if( !usuarioId ){
            htmlSesionInactiva = Utils.BuscarHtml('tplSesionInactiva');
            this.plantillaLogin = htmlSesionInactiva;
            this.render();
        }
        else{
            this.modelo = Usuario.BuscarUsuarioId(usuarioId);
            htmlSesionActiva = Utils.BuscarHtml('tplSesionActiva');
            var loginOk =  _.template(htmlSesionActiva.trim());
            this.plantillaLogin = loginOk( this.modelo );
            this.render();
        }
    },

    initialize: function(){
        self = this;
        $.getJSON('consultarSesion', function(respuesta){
            self.user = respuesta.usuario;
            console.log('entro al getJSON()'+self.user);
            self.verificaSesion(this.user);
        });
    },

    events:{
        'click #btnIniciarSesion': 'iniciarSesion',

        'click #olvidoClave': 'olvidoClave',

        'click #registrate': 'registrarNuevo',

        'click #editarPerfil': 'perfil',
        'click #cerrarSesion': 'cerrarSesion',
    },

    perfil: function(){
        var miVistaPerfil = new Vista.Perfil({model: this.modelo});
    },

    cerrarSesion: function(){
        Usuario.CerrarSesion()
        var indexModelo = new Models.Index()
        var indexView = new App.Views.Index({model: indexModelo});
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
            Notificar.modalOk('Atencion ...', 'Contraseña incorrecta', '#modal-danger');
        }
    },

    render: function(){
        this.$el.html(this.plantillaLogin);
        return this;
    }

});

