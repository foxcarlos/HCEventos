
var Vista = Vista || {};

Vista.ComboBox = Backbone.View.extend({

    initialize: function(){
        this.data = this.options.collections;
        this.valor = this.options.defaultValue
        this.elemento = this.options.el
        this.render();
    },

    events:{
    },

    htmlComboBox: function(){
        /*Parametro recibido: data objeto json
         Functiom que recorre un json y arma
         un objeto Select (comboBox)
        */

        var datos = this.data  // this.BuscarReg_TipoIdentidad();
        var htmlSelectArmar= '';

        for (var i=0;i<datos.length;i++){
            var id = "'"+datos[i].id+"'";
            var descripcion = datos[i].descripcion;
            var htmlSelectArmar = htmlSelectArmar + "<option value="+ id +">"+ descripcion +"</option>" ;
        }
        return htmlSelectArmar
    },

    render: function(){
        this.$el.html( this.htmlComboBox() );
        $("select"+this.elemento).val(this.valor);
        return this;
    }

});
