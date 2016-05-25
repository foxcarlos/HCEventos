var Vista = Vista || {};

Vista.CuerpoIndex = Backbone.View.extend({
    plantilla: _.template( Utils.BuscarHtml('tplCuerpoIndex') ),

    initialize: function(){
        this.render();
    },

    events: {
        'click #editarPerfil': 'perfil'
    },

    perfil: function(){
        alert('click en perfil');
    },

    render: function(){
        this.$el.html(this.plantilla(this.model.toJSON()));
        return this;
    }
});

