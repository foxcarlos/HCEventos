var Collections = Collections || {};

// Modelo Ciudades
    Collections.Ciudades = Backbone.Collection.extend({
        url: 'ciudad',

        model: Models.ciudad,

        initialize: function(options){
        }
    });
