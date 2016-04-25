var Vista = Vista || {};

Vista.PerfilCambiarClave = Backbone.View.extend({

    plantilla: _.template( Utils.BuscarHtml('tplPerfilCambiarClave') ),

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html( this.plantilla(this.model) );
        $("#password0").focus();
    return this;
    }

});

