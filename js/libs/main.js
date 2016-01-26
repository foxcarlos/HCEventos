(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.plantilla = function(id){
           return _.template( $('#' + id).html() );
    };

    // Person Model
    App.Models.Person = Backbone.Model.extend({
        defaults:{
            nombre: 'Usuario Guest',
            edad: '1',
            ocupacion: 'Trabajador'
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

    var peopleView = new App.Views.People({ collection: peopleCollection });
    $(document.body).append(peopleView.render().el);   // adding people view in DOM.. Only for demo
})();
