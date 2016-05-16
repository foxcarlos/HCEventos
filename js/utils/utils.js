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
}
