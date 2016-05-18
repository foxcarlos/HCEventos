var Collections = Collections || {};

// Modelo usuario
    Collections.Edo_civil = Backbone.Collection.extend({
        url: 'edocivil',

        model: Models.Edo_civil,

        initialize: function(options){
        }
    });

