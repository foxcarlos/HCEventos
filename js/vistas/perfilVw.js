var Vista = Vista || {};

Vista.Perfil = Backbone.View.extend({
    el: '#divCuerpoIndex',

    plantilla: _.template( Utils.BuscarHtml('tplPerfil') ),

    initialize: function(){
        this.render();
    },

    events:{
        'click #tabDatosPersonales': 'vistaDatosPersonales',
    },

    vistaDatosPersonales: function(){
        $("body").css("cursor", "progress");
        console.log(this.model);
        vistaCambiarDatosP = new  Vista.PerfilCambiarDatosPersonales({el: '#plantillaCambiarDatosPersonales', model: this.model});
        $("body").css("cursor", "default");
        console.log('Termino de ejecutar la vistaCambiarDatosP')
    },

    render: function(){
        this.$el.html( this.plantilla() );
        vistaCambiarClave = new  Vista.PerfilCambiarClave({el: '#plantillaCambiarClave', model: this.model});
        return this;
    }

});

