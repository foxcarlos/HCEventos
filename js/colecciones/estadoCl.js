var Collections = Collections || {};

// Modelo Estados
    Collections.Estados = Backbone.Collection.extend({
        url: 'estado',

        model: Models.Estado,

        initialize: function(options){
        }
    });

