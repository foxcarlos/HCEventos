var Models = Models || {};

// Modelo Pais
    Models.Pais = Backbone.Model.extend({
        urlRoot: 'pais',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

