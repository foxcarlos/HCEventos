var Models = Models || {};

// Modelo usuario
    Models.Usuarios = Backbone.Model.extend({
        urlRoot: 'usuario',

        defaults:{
            id: '',
            login: '',
            clave: '',
            rol_id: '',
            status: '',
            fecha_creacion: '',
            creado_por_id: ''
        }
    });

