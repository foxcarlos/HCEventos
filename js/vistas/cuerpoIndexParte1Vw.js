var Vista = Vista || {};

// Vista para el Cuerpo del Index Parte 1:
Vista.CuerpoIndexParte1 = Backbone.View.extend({
    plantilla: _.template( Utils.BuscarHtml('tplCuerpoIndexParte1') ),

    initialize: function(){
        this.render();
    },

    render: function(){
        mi = this.plantilla( this.model.toJSON() );
        this.$el.html( mi );
        return this;
    }
});

