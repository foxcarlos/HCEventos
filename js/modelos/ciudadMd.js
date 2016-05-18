var Models = Models || {};

// Modelo Ciudad
    Models.Ciudad = Backbone.Model.extend({
        urlRoot: 'ciudad',

        defaults:{
            id: '',
            descripcion: '',
        }
    });
