var Vista = Vista || {};

Vista.CuerpoIndexParte2 = Backbone.View.extend({
    plantilla: _.template( Utils.BuscarHtml('tplCuerpoIndexParte2') ),

    initialize: function(){
        this.render();
        $('#txtfechanac').datepicker();
    },

    events:{
        'click #botonRegistrar': 'registrarNuevo',
    },

    validarCampos: function(objeto){
        /* Esta funcion permite validar algunos campos del
        * form de registro rapido, solo valida si la
        * informacion esta escrita correctamente*/

        var errorCampo = {estado: false, mensaje: 'Mensaje:'};

        // Valida el Correo que tenga el formato correcto
        var rgxEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var rgxMovil = /^([0]{1}[4]{1})(12|14|16|24|26)([0-9]{7})$/;
        var rgxFnac = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

        corr = $(objeto).val();
        cla = $('#newpassword').val();
        cla2 = $('#newpassword2').val();
        mov = $('#txtmovil').val();
        fnac = $('#txtfechanac').val();

        if( objeto == '#txtcorreo' ){
            if( !rgxEmail.test( corr) || !corr ){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Correo Invalido';
            }
        }

        if( objeto == '#newpassword2' ){
            if( cla2 != cla ){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Contraseñas no coinciden';
            }
        }

        if( objeto == '#txtmovil' ){
            if( !rgxMovil.test(mov) || !mov){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Numero de Movil invalido, verifique que no tenga espacios ni puntos ni guion';
            }
        }

        if( objeto == '#txtfechanac' ){
            if( !rgxFnac.test(fnac) || !fnac){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Fecha de Nacimiento Invalida';
            }
        }

        return errorCampo;
    },

    validarCamposVacios: function(){
        /*Este metodo verifica si existe un
        campo del form vacio, de ser asi
        envia un alert()
        */

        var todoBien = true;
        var errorCampo = {estado: false, mensaje: ''};

        // Lista todos los elementos input del Form
        var lista = $("#registroRapido :input");
        var longitud = lista.length;

        for(var i=0; i<longitud; i++){
            var selector = '#'+lista[i].id;
            var descripcion = lista.get(i).placeholder;
            var valor = $(selector).val();

            if( valor.trim() ){
                errorCampoDevuelto = this.validarCampos(selector);

                if( errorCampoDevuelto.estado ){
                    todoBien = false;
                    Notificar.modalOk('Atencion ...', errorCampoDevuelto.mensaje, '#modal-warning');
                    // alert( errorCampoDevuelto.mensaje );
                    $(selector).focus();
                    break;
                }
            }

            if(!valor.trim()){
                todoBien = false;
                Notificar.modalOk('Atencion ...', 'Campo vacio:'+descripcion, '#modal-warning');
                //alert('Campo vacio: '+ descripcion);
                $(selector).focus();
                break;
            }
        }
        return todoBien;
      },

    limpiarCampos: function(){
        /*Este metodo limpiar los camposn
        del form */

        // Lista todos los elementos input del Form
        var lista = $("#registroRapido :input");
        var longitud = lista.length;

        for(var i=0; i<longitud; i++){
            selector = '#'+lista[i].id;
            valor = $(selector).val('');
        }
      },

    registrarNuevo: function(){

        var todoBien = true;
        // Valores de los Text del FORM
        nom = $('#txtnombre').val();
        ape = $('#txtapellido').val();
        corr = $('#txtcorreo').val();
        cla = $('#newpassword').val();
        cla2 = $('#newpassword2').val();
        mov = $('#txtmovil').val();
        fnac = $('#txtfechanac').val();
        gen = $('input[type=radio]:checked').val();

        var mo = new Models.RegistroRapido({
            nombre: nom,
            apellido: ape,
            correo: corr,
            clave: cla,
            clave2: cla2,
            movil: mov,
            fechaNac: fnac,
            genero: gen
        });

        camposVacios = this.validarCamposVacios();

        self = this;

        if(camposVacios){
            mo.save({},{
                success: function(model, response){
                    if( response.status ){
                        Notificar.modalOk('Felicidades ...', response.mensaje, '#modal-success');
                        // alert(response.mensaje);
                        self.limpiarCampos();

                        mensajeEnviar1 = 'Estimado(a) Sr(a) '+ mo.get('nombre') + ', ' + mo.get('apellido') + ' La afiliacion a Eventos Hospital Coromoto fue realizada con exito';
                        mensajeEnviar2 = 'Recuerde que al volver a ingresar al sistema de Eventos Hospital Coromoto, debe ingresar lo siguiente:'+'Usuario:'+ mo.get('correo')+ ' y Clave:'+ mo.get('clave');
                        Notificar.Sms(response.id_usuario, mensajeEnviar1);
                        Notificar.Sms(response.id_usuario, mensajeEnviar2);
                    }else{
                        Notificar.modalOk('Alerta ...', response.mensaje, '#modal-danger');
                    }
                },

                error: function(model, response){
                    Notificar.modalOk('Alerta ...', response.mensaje, '#modal-danger');
                    // alert(response.mensaje);
                    self.limpiarCampos();
                }
            });
        }
    },

    render: function(){
        this.$el.html(this.plantilla(this.model.toJSON()));
        $('#txtfechanac').datepicker();
        return this;
    }

});

