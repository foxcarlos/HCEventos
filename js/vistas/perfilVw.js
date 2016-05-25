var Vista = Vista || {};

Vista.Perfil = Backbone.View.extend({
    el: '#divCuerpoIndex',

    plantilla: _.template( Utils.BuscarHtml('tplPerfil') ),

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html( this.plantilla() );
        vistaCambiarClave = new  Vista.PerfilCambiarClave({el: '#plantillaCambiarClave', model: this.model});
        vistaCambiarDatosP = new  Vista.PerfilCambiarDatosPersonales({el: '#plantillaCambiarDatosPersonales', model: this.model});
   return this;
    }

});

