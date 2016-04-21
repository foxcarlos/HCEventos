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
        // this.$el.html('<a>Editar</a>');
        this.$el.html( this.plantilla() );
    return this;
    }

});

