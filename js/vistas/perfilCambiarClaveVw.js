var Vista = Vista || {};

Vista.Perfil = Backbone.View.extend({
    //el: '#',

    //plantilla: _.template( Utils.BuscarHtml('tplPerfil') ),

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html( this.plantilla() );
    return this;
    }

});

