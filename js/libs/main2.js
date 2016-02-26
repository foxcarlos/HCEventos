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
            cabeceraTitulo: 'EVENTOS HOSPITAL COROMOTO',
            jumbotronTitulo: 'II JORNADAS CIENTIFICAS INTEGRALES DEL HOSPITAL COROMOTO',
            jumbotronAlertaCentral1: 'Del 05 al 07 de Agosto de 2016',
            jumbotronAlertaCentral2: 'Hotel Venetur',
            jumbotronAlertaCentral3: '"Salud con Vocaci&oacute;n Socialista"',
            jumbotronAlertaCentralDifusion: 'Hotel Venetur Maracaibo',
            jumbotronAlertaCentralContacto1: '(0261) 7900331/7900308/7900364',
            jumbotronAlertaCentralContacto2: 'congresoshospitalcoromoto@gmail.com',
            jumbotronAlertaCentralContacto3: 'congresoshospitalcoromoto@outlook.com',
            piePagina: '&reg; Desarrollo de Aplicaciones - Coordinacion de sistemas - Hospital coromoto  2016.'
        }
    });

    // Modelo para el Menu
    App.Models.Menu = Backbone.Collection.extend({
        url: '/menu/1'
    });

    // Vista para el menu Configurar de la cabecera:
    var VistaCabeceraMenu = Backbone.View.extend({
      plantillaCabeceraMenu: plantilla('pruebaPlantilla'),
      plantillaCabeceraMenu2: plantilla('prueba2Plantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        suma = this.plantillaCabeceraMenu() + this.plantillaCabeceraMenu2();
        console.log(suma);
        this.$el.html(suma);
        return this;
      }
    });

    // Vista para la cabecera del Index:
    var VistaCabeceraIndex = Backbone.View.extend({
      plantillaCabeceraIndex: plantilla('cabeceraIndexPlantilla'),

      initialize: function(){
        this.render();
      },

      events:{
          'click #action': function(){alert('Hola')}
      },

      render: function(){
        this.$el.html(this.plantillaCabeceraIndex(this.model.toJSON()));
        return this;
      }
    });

    // Vista para el Login del Index:
    var VistaLogin = Backbone.View.extend({
        //plantillaLogin: plantilla('sesionActivaPlantilla'),
        plantillaLogin: plantilla('sesionInactivaPlantilla'),


      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaLogin());
        return this;
      }

    });

    // Vista para el Cuerpo del Index:
    var VistaCuerpoIndex = Backbone.View.extend({
      plantillaCuerpoIndex: plantilla('cuerpoIndexPlantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaCuerpoIndex(this.model.toJSON()));
        return this;
      }
    });

    // Vista para el Cuerpo del Index Parte 1:
    var VistaCuerpoIndexParte1 = Backbone.View.extend({
      plantillaCuerpoIndexParte1: plantilla('cuerpoIndexParte1Plantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaCuerpoIndexParte1(this.model.toJSON()));
        return this;
      }

    });

    // Vista para el Cuerpo del Index Parte 2:
    var VistaCuerpoIndexParte2 = Backbone.View.extend({
      plantillaCuerpoIndexParte2: plantilla('cuerpoIndexParte2Plantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaCuerpoIndexParte2(this.model.toJSON()));
        return this;
      }

    });

    // Vista para el Pie de pagina del Index:
    var VistaPiePaginaIndex = Backbone.View.extend({
      plantillaPiePagina: plantilla('piePaginaPlantilla'),

      initialize: function(){
        this.render();
      },

      render: function(){
        this.$el.html(this.plantillaPiePagina(this.model.toJSON()));
        return this;
      }

    });

    // Vista para el Index:
    App.Views.Index = Backbone.View.extend({
        tagName: 'body',

        miPlantilla: plantilla('index'),  // _.template($('#personaPlantilla').html()) ,

        initialize: function(){

        },

        events: {
          'click #menu-toggle': 'mostrarMenu',
        },

        mostrarMenu: function(e){
          e.preventDefault()
          this.$('#wrapper').toggleClass('toggled');
        },

        mostrarVitasHijas: function(){
          miSelector = '#divCabeceraIndex';
          var miVistaCabeceraIndex = new VistaCabeceraIndex({el: miSelector, model: this.model});
          this.$(miSelector).append(miVistaCabeceraIndex.render().el);

          miSelector = '#ulMenu';
          var miVistaCabeceraMenu = new VistaCabeceraMenu({el: miSelector, model: this.model});
          var renderizar = miVistaCabeceraMenu.render().el;
          this.$(miSelector).append(miVistaCabeceraMenu.render().el);

          miSelector = '#divInicioSesion'
          var miVistaLogin = new VistaLogin({el: miSelector});
          this.$(miSelector).append(miVistaLogin.render().el);

          miSelector = '#divPiePaginaIndex';
          var miVistaPiePaginaIndex = new VistaPiePaginaIndex({el: miSelector, model: this.model});
          this.$(miSelector).append(miVistaPiePaginaIndex.render().el);

          miSelector = '#divCuerpoIndex'
          var miVistaCuerpoIndex = new VistaCuerpoIndex({el: miSelector, model: this.model});
          this.$(miSelector).append(miVistaCuerpoIndex.render().el);

          miSelector = '#divCuerpoIndexParte1'
          var miVistaCuerpoIndexParte1 = new VistaCuerpoIndexParte1({el: miSelector, model: this.model});
          console.log(miVistaCuerpoIndexParte1.render().el)
          this.$(miSelector).append(miVistaCuerpoIndexParte1.render().el);

          miSelector = '#divCuerpoIndexParte2'
          var miVistaCuerpoIndexParte2 = new VistaCuerpoIndexParte2({el: miSelector, model: this.model});
          console.log(miVistaCuerpoIndexParte2.render().el)
          this.$(miSelector).append(miVistaCuerpoIndexParte2.render().el);
        },

        render: function(){
          this.$el.html(this.miPlantilla(this.model.toJSON()));
          return this;
        }
    });

    var indexModelo = new App.Models.Index()
    var indexView = new App.Views.Index({model: indexModelo});
    $(document.body).append(indexView.render().el);  // Añade el index al DOM
    $(document.body).append(indexView.mostrarVitasHijas());  // Añade el el Login al DOM

})();
