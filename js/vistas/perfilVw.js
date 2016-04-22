var Vista = Vista || {};

Vista.Perfil = Backbone.View.extend({
    el: '#divCuerpoIndex',

    plantilla: _.template( Utils.BuscarHtml('tplPerfil') ),

    plantillaCambiarClave: _.template( Utils.BuscarHtml( 'tplPerfilCambiarClave' ) )

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html( this.plantilla() );
        vistaCambiarClave = new  Vista.PerfilCambiarClave({el: '#plantillaCambiarClave', plantilla: plantillaCambiarClave})
    return this;
    }

});

