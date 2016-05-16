var Collections = Collections || {};

// Modelo usuario
    Collections.Tipos_identidad = Backbone.Collection.extend({
        url: 'tipo_identidad',

        model: Models.Tipo_identidad,

        initialize: function(options){
        }
    });

