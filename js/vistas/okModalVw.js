var Vista = Vista || {};

Vista.OkModal = Backbone.View.extend({
    el: '#divModal',

    plantilla: _.template( Utils.BuscarHtml('tplOkModal') ),

    initialize: function(){
        this.render();
    },

    events:{
        'click #btnModalOk': function(){
            //alert('Ok')
        }
    },

    render: function(){
        this.$el.html( this.plantilla( this.model.toJSON() ) );
        return this;
    }

});

