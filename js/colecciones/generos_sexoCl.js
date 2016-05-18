var Collections = Collections || {};

// Modelo usuario
    Collections.Generos_sexo = Backbone.Collection.extend({
        url: 'genero_sexo',

        model: Models.Genero_sexo,

        initialize: function(options){
        }
    });

