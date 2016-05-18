var Models = Models || {};

// Modelo Estado
    Models.Estado = Backbone.Model.extend({
        urlRoot: 'estado',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

