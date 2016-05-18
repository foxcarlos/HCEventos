var Collections = Collections || {};

// Modelo usuario
    Collections.Edos_civil = Backbone.Collection.extend({
        url: 'edocivil',

        model: Models.Edo_civil,

        initialize: function(options){
        }
    });

