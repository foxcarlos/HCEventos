var Utils = Utils || {};

Utils.Varias = {
    BuscarReg_TipoIdentidad: function(){
        var Tipos_identidad = new Collections.Tipos_identidad();
        self = this;
        respuesta = Tipos_identidad.fetch({async: false});

        respuesta.done(function(respon){
            if( respon ){
                self.d = respon;
            }
        });

        respuesta.fail(function(respon){
            console.log('fail '+respon);
        });

        return this.d
    },

    ArmarComboBox_Id_Descripcion: function(data){
        /*Parametro recibido: data objeto json
         Functiom que recorre un json y arma
         un objeto Select (comboBox)
        */

        var datos = data  // this.BuscarReg_TipoIdentidad();
        var htmlSelectArmar= '';

        for (var i=0;i<datos.length;i++){
            var id = "'"+datos[i].id+"'";
            var descripcion = datos[i].descripcion;
            var htmlSelectArmar = htmlSelectArmar + "<option value="+ id +">"+ descripcion +"</option>" ;
        }
        return htmlSelectArmar
    },

    ComboBox_TipoIdentidad: function(){
        data = this.BuscarReg_TipoIdentidad();
        htmlDevuelto = this.ArmarComboBox_Id_Descripcion(data);
        return htmlDevuelto
    }
}
