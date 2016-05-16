
var Vista = Vista || {};

Vista.ComboBox = Backbone.View.extend({

    plantilla: _.template( this.htmlComboBox( this.options.collections ) ),

    initialize: function(options){
        this.miCollections = this.options.collections;
        /*// console.log(this.miCollections);
        this.valor = this.options.defaultValue
        this.elemento = this.options.el*/
        this.render();
    },

    events:{
    },

    htmlComboBox: function(dataRecibida){
        /*Parametro recibido: data objeto json
         Functiom que recorre un json y arma
         un objeto Select (comboBox)
        */

        var datos = dataRecibida  // this.options.collections  // this.BuscarReg_TipoIdentidad();
        var htmlSelectArmar= '';
        console.log(datos)

        for (var i=0;i<datos.length;i++){
            if( datos[i].id = this.valor){
                seleccionado = ' selected="selected" ';
            }else{
                seleccionado = '';
            }

            var id = "'"+datos[i].id+"'";
            var descripcion = datos[i].descripcion;
            var htmlSelectArmar = htmlSelectArmar + "<option value="+ id + seleccionado +">"+ descripcion +"</option>" ;
        }
        return htmlSelectArmar
    },

    render: function(){
        //this.$el.html( );
        // slc = "select"+this.elemento;
        console.log( this.plantilla() );
        // $(slc).val(this.valor);
        return this;
    }

});
