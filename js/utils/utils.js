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

    BuscarReg_Genero: function(){
        var Generos = new Collections.Generos_sexo();
        self = this;
        respuesta = Generos.fetch({async: false});

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

    BuscarReg_Nacionalidad: function(){
        var Nacional = new Collections.Nacionalidad();
        self = this;
        respuesta = Nacional.fetch({async: false});

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

    BuscarReg_EdoCivil: function(){
        var Edos = new Collections.Edos_civil();
        self = this;
        respuesta = Edos.fetch({async: false});

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

    BuscarReg_Pais: function(){
        var Edos = new Collections.Pais();
        self = this;
        respuesta = Edos.fetch({async: false});

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
