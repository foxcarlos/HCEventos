var Models = Models || {};

// Modelo Genero_sexo
    Models.Nacionalidad = Backbone.Model.extend({
        urlRoot: 'nacionalidad',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

