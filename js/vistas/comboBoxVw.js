
var Vista = Vista || {};

Vista.ComboBox = Backbone.View.extend({

    plantilla: _.template( Utils.BuscarHtml('tplPerfil') ),

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
