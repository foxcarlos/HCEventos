var Models = Models || {};

// Modelo Genero_sexo
    Models.Genero_sexo = Backbone.Model.extend({
        urlRoot: 'genero_sexo',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

