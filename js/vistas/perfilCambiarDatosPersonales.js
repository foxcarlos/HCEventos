var Vista = Vista || {};

Vista.PerfilCambiarDatosPersonales = Backbone.View.extend({

    plantilla: _.template( Utils.BuscarHtml('tplPerfilCambiarDatosPersonales') ),

    initialize: function(){
        this.render();
    },

    events:{
        'click #btnGuardarClave': 'guardarClave',
        'click #btnCancelarGuardar': 'cancelarGuardar'
    },

    cancelarGuardar: function(){
        this.limpiarCampos();
    },

    guardarClave: function(){
        if ( this.validarCamposVacios() ){
            var id_usuario = this.model.id_usuario;
            var clave = $('#password1').val();
            var nombre_usuario = this.model.nombre_usuario;

            // Este Metodo es el que cambia la clave
            PerfilUsuarios.PerfilCambiarClave(id_usuario, clave, nombre_usuario)
            this.limpiarCampos();

        }
    },

    verificaClaveAnterior: function(){
        var inUsuario = this.model.nombre_usuario;
        var inClave = $('#password0').val();

        dataEnviar = {usuario: inUsuario, clave: inClave}
        response = Usuario.IniciarSesion(dataEnviar)

        var estado = response.status;
        var usuarioId = response.mensaje;

        if( estado ){
            return true
        }
        else{
            return false
        }

    },

    limpiarCampos: function(){
        /*Este metodo limpiar los camposn
        del form */

        // Lista todos los elementos input del Form
        var lista = $("#frmCambiarClave :input");
        var longitud = lista.length;

        for(var i=0; i<longitud; i++){
            selector = '#'+lista[i].id;
            valor = $(selector).val('');
        }
      },

    validarCampos: function(objeto){
        /* Esta funcion permite validar algunos campos del
        * form de registro rapido, solo valida si la
        * informacion esta escrita correctamente*/

        var errorCampo = {estado: false, mensaje: 'Mensaje:'};

        claAnt = $('#password0').val();
        cla = $('#password1').val();
        cla2 = $('#password2').val();

        if( objeto == '#password0' ){
            if( !this.verificaClaveAnterior()){
                errorCampo.estado = true;
                errorCampo.mensaje = 'La Contraseña anterior es incorrecta'
            }
        }

        if( objeto == '#password2' ){
            if( cla2 != cla ){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Contraseñas no coinciden';
            }
        }

        return errorCampo
    },

    validarCamposVacios: function(){
        /*Este metodo verifica si existe un
        campo del form vacio, de ser asi
        envia un alert()
        */

        var todoBien = true;
        var errorCampo = {estado: false, mensaje: ''}

        // Lista todos los elementos input del Form
        var lista = $("#frmCambiarClave :input");
        var longitud = lista.length;

        for(var i=0; i<longitud; i++){
            var selector = '#'+lista[i].id;
            var descripcion = lista.get(i).placeholder;
            var valor = $(selector).val();

            if( valor.trim() ){
                errorCampoDevuelto = this.validarCampos(selector);

                if( errorCampoDevuelto.estado ){
                    todoBien = false
                    alert( errorCampoDevuelto.mensaje );
                    $(selector).focus();
                    break
                }
            }

            if(!valor.trim()){
                todoBien = false;
                alert('Campo vacio: '+ descripcion);
                $(selector).focus();
                break
            }
        }
        return todoBien;
      },

    render: function(){
        this.$el.html( this.plantilla(this.model) );
    return this;
    }

});

