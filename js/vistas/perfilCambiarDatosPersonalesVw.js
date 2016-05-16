var Vista = Vista || {};

Vista.PerfilCambiarDatosPersonales = Backbone.View.extend({

    plantilla: _.template( Utils.BuscarHtml('tplPerfilCambiarDatosPersonales') ),

    initialize: function(){
        this.render();
    },

    events:{
        'click #btnGuardarDatosP': 'guardarDatosP',
        'click #btnCancelarDatosP': 'cancelarDatosP'
    },

    cancelarDatosP: function(){
        this.limpiarCampos();
    },

    guardarDatosP: function(){
        if ( this.validarCamposVacios() ){
            var id_usuario = this.model.id_usuario;
            var clave = $('#password1').val();
            var nombre_usuario = this.model.nombre_usuario;

            // Este Metodo es el que cambia la clave
            PerfilUsuarios.PerfilCambiarClave(id_usuario, clave, nombre_usuario)
            this.limpiarCampos();

        }
    },

    limpiarCampos: function(){
        /*Este metodo limpiar los camposn
        del form */

        // Lista todos los elementos input del Form
        var lista = $("#frmDatosPersonales :input");
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
        var lista = $("#frmDatosPersonales :input");
        var longitud = lista.length;

        for(var i=0; i<longitud; i++){
            var selector = '#'+lista[i].id;
            var descripcion = lista.get(i).placeholder;
            var valor = $(selector).val();

            if( valor.trim() ){
                errorCampoDevuelto = this.validarCampos(selector);

                if( errorCampoDevuelto.estado ){
                    todoBien = false
                    Notificar.modalOk('Atencion ...', errorCampoDevuelto.mensaje, '#modal-warning');
                    $(selector).focus();
                    break
                }
            }

            if(!valor.trim()){
                todoBien = false;
                Notificar.modalOk('Atencion ...', 'Campo vacio' + descripcion, '#modal-warning');
                $(selector).focus();
                break
            }
        }
        return todoBien;
      },

    render: function(){
        this.$el.html( this.plantilla(this.model) );

        valorDefault = this.model.id_tipo_identidad;
        console.log(valorDefault)
        data = Utils.Varias.BuscarReg_TipoIdentidad();
        cbx = new Vista.ComboBox({el: '#slcTipoIdentidad', collections: data, default: valorDefault})

        // $("#slcTipoIdentidad").html( Utils.Varias.ComboBox_TipoIdentidad() );
        // $("select#slcTipoIdentidad").val(valor);
    return this;
    }

});
