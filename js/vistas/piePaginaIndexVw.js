var Vista = Vista || {};

Vista.PiePaginaIndex = Backbone.View.extend({
    plantilla: _.template( Utils.BuscarHtml('tplPiePaginaIndex') ),

    initialize: function(){
        this.render();
    },

    render: function(){
        this.$el.html(this.plantilla(this.model.toJSON()));
        return this;
    }
});

