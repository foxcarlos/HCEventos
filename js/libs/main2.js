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
    App.Models.Person = Backbone.Model.extend({
        defaults:{
            cabeceraTitulo: 'EVENTOS ACADEMICOS E INVESTIGACION HOSPITAL COROMOTO',
            jumbotronTitulo: 'II JORNADAS CIENTIFICAS INTEGRALES DEL HOSPITAL COROMOTO',
            jumbotronAlertaCentral1: 'Del 05 al 07 de Agosto de 2015',
            jumbotronAlertaCentral2: 'Hotel Venetur',
            jumbotronAlertaCentral3: '"Salud con Vocaci&oacute;n Socialista"',
            jumbotronAlertaCentralDifusion: 'Hotel Venetur Maracaibo',
            jumbotronAlertaCentralContacto1: '(0261) 7900331/7900308/7900364',
            jumbotronAlertaCentralContacto2: 'congresoshospitalcoromoto@gmail.com',
            jumbotronAlertaCentralContacto3: 'congresoshospitalcoromoto@outlook.com'
        }
    });

    //Lista de Personas
    App.Collections.People = Backbone.Collection.extend({
        model: App.Models.Person
    });


    //Vista para varias de Personas
    App.Views.People = Backbone.View.extend({
        tagName: 'ul',

        initialize: function(){
            console.log('metodo initialize de PeopleView');
        },

        render: function(){
            this.collection.each(function(person){
                var personaVista = new App.Views.Person({model: person});
                this.$el.append(personaVista.render().el);
            }, this);

            return this;
        }

    });

    //Vista para una persona
    App.Views.Person = Backbone.View.extend({
        tagName: 'li',

        miPlantilla: plantilla('personaPlantilla'),  // _.template($('#personaPlantilla').html()) ,
        /*initialize: function(){
            this.render();
        },*/

        render: function(){
            this.$el.html(this.miPlantilla(this.model.toJSON()));
            return this;
        }
    });

    //Vista para el Index
    App.Views.Index = Backbone.View.extend({
        tagName: 'body',

        miPlantilla: plantilla('index'),  // _.template($('#personaPlantilla').html()) ,
        /*initialize: function(){
            this.render();
        },*/

        events: {
          'click #menu-toggle': 'miClick'
        },

        miClick: function(){
          alert('Hizo clic ');
          $(document.body).append('hola');   // adding people view in DOM.. Only for demo
        },

        render: function(){
            this.$el.html(this.miPlantilla(this.model.toJSON()));
            return this;
        }
    });

    //Agregar datos a una coleccion
    var peopleCollection = new App.Collections.People([
            {
                nombre: 'Carlos', edad: 43, ocupacion:'Developer'
            },
            {
                nombre:'Nairesther', edad:26, ocupacion:'Educadora'
            },
            {
                nombre: 'Paola', edad:15, ocupacion: 'Estudiante'
            },
            {
                nombre: 'Carla', edad:6, ocupacion: 'Estudiante'
            }
            ]);

    var persona = new App.Models.Person()
    //var peopleView = new App.Views.People({ collection: peopleCollection });
    var indexView = new App.Views.Index({model: persona});
    $(document.body).append(indexView.render().el);   // adding people view in DOM.. Only for demo
})();
