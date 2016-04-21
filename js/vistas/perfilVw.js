var Vista = Vista || {};

Vista.Perfil = Backbone.View.extend({
    el:'#divCuerpoIndex',

    obtenerPlantilla: function(idElemento){
        return plantilla(idElemento);
    },

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html('<a>Editar</a>');
    return this;
    }

});

