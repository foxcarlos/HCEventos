var Models = Models || {};

// Modelo Edo_civil
    Models.Edo_civil = Backbone.Model.extend({
        urlRoot: 'edocivil',

        defaults:{
            id: '',
            descripcion: '',
        }
    });

