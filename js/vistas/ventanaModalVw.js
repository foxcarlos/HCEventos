var Vista = Vista || {};

Vista.OkModal = Backbone.View.extend({
    el: '#divModal',

    plantilla: _.template( Utils.BuscarHtml(this.nombreTemplate) ),

    initialize: function(){
        this.render();
    },

    events:{
    },

    render: function(){
        this.$el.html( this.plantilla() );
        //return this;
    }

});

