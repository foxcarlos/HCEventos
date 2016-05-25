
var Vista = Vista || {};

Vista.ComboBox = Backbone.View.extend({

    // plantilla: _.template( this.htmlComboBox( this.options.collections ) ),

    initialize: function(){
        this.data = this.options.collections;
        this.valor = this.options.defaultValue;
        this.elemento = this.options.el;
        this.render();
    },

    events:{
    },

    htmlComboBox: function(){
        /*Parametro recibido: data objeto json
         Functiom que recorre un json y arma
         un objeto Select (comboBox)
        */

        var datos = this.data;  // this.BuscarReg_TipoIdentidad();
        var htmlSelectArmar= '';
        seleccionado = '';
        console.log(datos);

        for (var i=0;i<datos.length;i++){
            if( datos[i].id == this.valor){
                seleccionado = ' selected="selected" ';
            }else{
                seleccionado = '';
            }

            var id = "'"+datos[i].id+"'";
            var descripcion = datos[i].descripcion;
            htmlSelectArmar = htmlSelectArmar + "<option value="+ id + seleccionado +">"+ descripcion +"</option>";
        }
        return htmlSelectArmar;
    },

    render: function(){
        this.$el.html( this.htmlComboBox() ) ;
        return this;
    }

});
