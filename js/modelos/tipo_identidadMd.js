var Models = Models || {};

// Modelo usuario
    Models.Tipo_identidad = Backbone.Model.extend({
        urlRoot: 'tipo_identidad',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

