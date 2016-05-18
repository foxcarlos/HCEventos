var Collections = Collections || {};

// Modelo usuario
    Collections.Nacionalidad = Backbone.Collection.extend({
        url: 'nacionalidad',

        model: Models.Nacionalidad,

        initialize: function(options){
        }
    });

