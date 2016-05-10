var Collections = Collections || {};

// Modelo usuario
    Collections.Tipos_identidad = Backbone.Model.extend({
        urlRoot: 'tipo_identidad',

        model: Models.Tipo_identidad,

        initialize: function(options){
        }
    });

