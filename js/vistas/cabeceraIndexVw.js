var Vista = Vista || {};

Vista.CabeceraIndex = Backbone.View.extend({
    plantillaCabeceraIndex: _.template( Utils.BuscarHtml('tplCabeceraIndex') ),

    initialize: function(){
        this.render();
    },

    render: function(){
        //alert(this.model);
        this.$el.html(this.plantillaCabeceraIndex(this.model.toJSON()));
        return this;
    }
});

