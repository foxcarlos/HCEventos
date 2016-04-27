var Models = Models || {};

Models.RegistroRapido = Backbone.Model.extend({
    urlRoot: 'crearRegistroRapido',

    defaults:{
        nombre: '',
        apellido: '',
        correo: '',
        clave: '',
        clave2: '',
        movil: '',
        fechaNac: '',
        genero: ''
    },

    initialize: function(){
        this.on('invalid', function(model, error){
            alert(error)
        });
    }
});

