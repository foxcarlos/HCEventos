var Collections = Collections || {};

// Modelo Pais
    Collections.Pais = Backbone.Collection.extend({
        url: 'pais',

        model: Models.Pais,

        initialize: function(options){
        }
    });

