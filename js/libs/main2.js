(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.plantilla = function(id){
           return _.template( $('#' + id).html() );
    };

    // Models Index
    App.Models.Index = Backbone.Model.extend({
        defaults:{
            cabeceraTitulo: 'EVENTOS ACADEMICOS E INVESTIGACION HOSPITAL COROMOTO',
            jumbotronTitulo: 'II JORNADAS CIENTIFICAS INTEGRALES DEL HOSPITAL COROMOTO',
            jumbotronAlertaCentral1: 'Del 05 al 07 de Agosto de 2016',
            jumbotronAlertaCentral2: 'Hotel Venetur',
            jumbotronAlertaCentral3: '"Salud con Vocaci&oacute;n Socialista"',
            jumbotronAlertaCentralDifusion: 'Hotel Venetur Maracaibo',
            jumbotronAlertaCentralContacto1: '(0261) 7900331/7900308/7900364',
            jumbotronAlertaCentralContacto2: 'congresoshospitalcoromoto@gmail.com',
            jumbotronAlertaCentralContacto3: 'congresoshospitalcoromoto@outlook.com'
        }
    });

    var VistaLogin = Backbone.View.extend({
      //tagName: 'divInicioSesion',

      plantillaLogin: plantilla('inicioSesionPlantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaLogin());
        return this;
      }

    });
    //Vista para el Index:
    App.Views.Index = Backbone.View.extend({
        tagName: 'body',

        miPlantilla: plantilla('index'),  // _.template($('#personaPlantilla').html()) ,

        /*initialize: function(){
        },*/

        events: {
          'click #menu-toggle': 'mostrarMenu',

          'click #botonRegistrar': 'mostrarLogin',
        },

        mostrarMenu: function(e){
          e.preventDefault()
          this.$('#wrapper').toggleClass('toggled');
        },

        mostrarLogin: function(){
          miSelector = '#divInicioSesion'
          var miVistaLogin = new VistaLogin({el: miSelector});
          this.$(miSelector).append(miVistaLogin.render().el);
        },

        render: function(){
            this.$el.html(this.miPlantilla(this.model.toJSON()));
            return this;
        }
    });

    var index = new App.Models.Index()
    var indexView = new App.Views.Index({model: index});
    $(document.body).append(indexView.render().el);   // adding people view in DOM.. Only for demo
})();
