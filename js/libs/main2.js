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

    // Modelo para el regitro rapido de cuentas nuevas
    App.Models.MensajeModal = Backbone.Model.extend({
        // urlRoot: 'crearRegistroRapido',

        defaults:{
            modalCabecera: '',
            modalCuerpo1: '',
            modalCuerpo2: '',
            modalBoton1: '',
            modalBoton2: ''
        },
    });

    // Modelo para el regitro rapido de cuentas nuevas
    App.Models.RegistroRapido = Backbone.Model.extend({
        urlRoot: 'crearRegistroRapido',

        defaults:{
            nombre: '',
            apellido: '',
            correo: '',
            clave: '',
            fechaNac: '',
            genero: ''
        },
    });

    // Modelo para el Menu
    App.Collections.Menu = Backbone.Collection.extend({
        url: '/menu/1'
        /*
         Esta Coleccion se instancia:
         var menu = new App.Collections.Menu();
         menu.fetch()
         luego se recorre con:
         for(var i=0;i<menu.length;i=i+1){
            console.log(menu.at(i).attributes)
         }

         menu.forEach(function(modelo, index, arreglo){
           console.log(modelo.get('nombre'))
           })

         var Coleccion = Backbone.Collection.extend({
          url: '/menu/1'
    });

    miColeccion.forEach(function(modelo, index, arreglo){
        if(modelo.get("depende_menu_id")==0){
            console.log(modelo.get("nombre"));
            $("#ulMenu").append('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'+ modelo.get("nombre") +'<span class="caret"></span><a><ul '+'id="ul'+modelo.get("id")+'"'+' class="dropdown-menu" role="menu"></ul></li>')
        }
   })

        */
    });

    // Otra Prueba para generar menus:
    var VistaCabeceraMenues = Backbone.View.extend({
      plantillaCabeceraMenues: plantilla('pru'),

      initialize: function(){
        this.render();
      },

      render: function(){
        p = this.plantillaCabeceraMenues({nombreMenu: 'hola'});
        console.log(p);
        this.$el.html(p);
        return this;
      }
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
      plantillaModal2: plantilla('modal2'),

      initialize: function(){
        this.render();
      },

      events:{
          'click #botonRegistrar': 'registrarNuevo',
      },

      registrarNuevo: function(){
          alert('Se regsitro');

          nom = $('#txtnombre').val();
          ape = $('#txtapellido').val();
          corr = $('#txtcorreo').val();
          corr2 = $('#txtconfcorreo').val();
          cla = $('#newpassword').val();
          fnac = $('#txtfechanac').val();
          gen = $('input[type=radio]:checked').val()

          var mo = new App.Models.RegistroRapido({
              nombre: nom,
              apellido: ape,
              fechaNac: fnac,
              clave: cla,
              correo: corr,
              genero: gen
          });
          r = mo.save();
          console.log(r.responseText);
          // var htm = plantillaModal2()
          // responseJSON.mensaje

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
          // this.$('#wrapper').toggleClass('toggled');
          alert('hola');
          this.$("#datepicker").datepicker();

        },

        mostrarVitasHijas: function(){
          miSelector = '#ulMenu';
          var miVistaCabeceraMenues = new VistaCabeceraMenues({el: miSelector, model: this.model});
          this.$(miSelector).append(miVistaCabeceraMenues.render().el);

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
