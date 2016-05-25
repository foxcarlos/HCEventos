var Vista = Vista || {};

Vista.MenuPrincipal = Backbone.View.extend({
    plantilla: _.template( Utils.BuscarHtml('tplMenuPrincipal') ),

    initialize: function(){
        this.render();
    },

    events:{
        'click #eventosDisponibles': 'mensaje',
        'click #registrarse': 'mensaje',
        'click #ver': 'mensaje',
        'click #listar': 'mensaje',
    },

    mensaje: function(){
        Notificar.modalOk('Información de Interes', 'Menú no disponible, Ud. sera notificado vía email y SMS cuando este habilitada esta opción', '#modal-info');
    },

    render: function(){
        this.$el.html( this.plantilla() );
        return this;
    }
});

