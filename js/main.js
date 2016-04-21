(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Plantilla: function(idPasado){
            console.log(idPasado)
            return _.template( $('#'+idPasado).html() )
        },
    };

    // Models Inde
    App.Models.Index = Backbone.Model.extend({
        defaults:{
            cabeceraTitulo: 'EVENTOS HOSPITAL COROMOTO',
            jumbotronTitulo: 'III Congreso IV Jornada Científica Integral y I Exposición Multidisciplinaria e Innovadora Hospital Coromoto 2016',
            jumbotronAlertaCentral1: 'Del 03 al 06 de Agosto de 2016',
            jumbotronAlertaCentral2: 'PDVSA La Estancia',
            jumbotronAlertaCentral3: '"Salud con Vocaci&oacute;n Socialista"',
            jumbotronAlertaCentralDifusion: 'PDVSA la Estancia Maracaibo',
            jumbotronAlertaCentralContacto1: '(0261) 7900331/7900308/7900364',
            jumbotronAlertaCentralContacto2: 'congresoshospitalcoromoto@gmail.com',
            jumbotronAlertaCentralContacto3: 'congresoshospitalcoromoto@outlook.com',
            piePagina: '&reg; Desarrollo de Aplicaciones - Coordinacion de sistemas - Hospital coromoto  2016.'
        }
    });

    // Modelo para el regitro rapido de cuentas nuevas
    App.Models.MensajeModal = Backbone.Model.extend({
        // urlRoot: 'crearRegistroRapido',

        defaults:{
            modalCabecera: '',
            modalCuerpo1: '',
            modalCuerpo2: '',
            modalBoton1: '',
            modalBoton2: ''
        }
    });

    // Modelo para datos del usuario
    App.Models.DatosUsuario = Backbone.Model.extend({
        urlRoot: 'datosUsuario',

        defaults:{
            id_tipo_identidad: '',
            tipo_identidad: '',
            cedula_passp: '',
            nombres: '',
            apellidos: '',
            fechanac: '',
            id_genero_sexo: '',
            genero_sexo: '',
            id_nacionalidad: '',
            nacionalidad: '',
            id_edo_civil: '',
            edo_civil: '',
            id_direccion: '',
            id_pais: '',
            pais: '',
            id_estado: '',
            estado: '',
            id_ciudad: '',
            ciudad: '',
            direccion: '',
            id_inf_personal: '',
            inf_personal_telefono_movil: '',
            inf_personal_telefono_habitacion: '',
            inf_personal_email: '',
            inf_personal_twitter: '',
            inf_personal_instagram: '',
            id_inf_laboral: '',
            cargo: '',
            institucionlaboral: '',
            direccionlaboral: '',
            telefonolaboral: '',
            faxlaboral: '',
            emaillaboral: '',
            weblaboral: '',
            twitterlaboral: '',
            id_inf_profesional: '',
            id_nivelacademico: '',
            descripcion: '',
            id_especialidad: '',
            profesioninstitucion: '',
            profesiondireccion: '',
            id_usuario: ''
        }
    });

    // Coleccion para los datos de los usuarios
    App.Collections.DatosUsuarios = Backbone.Collection.extend({
        model: App.Models.DatosUsuario,
    });

    // Modelo para el regitro rapido de cuentas nuevas
    App.Models.RegistroRapido = Backbone.Model.extend({
        urlRoot: 'crearRegistroRapido',

        defaults:{
            nombre: '',
            apellido: '',
            correo: '',
            clave: '',
            clave2: '',
            movil: '',
            fechaNac: '',
            genero: ''
        },

        initialize: function(){
            this.on('invalid', function(model, error){
                alert(error)
            });
        }
    });

// Modelo para el Menu
App.Collections.Menu = Backbone.Collection.extend({
    url: '/menu/1'
    /*
        Esta Coleccion se instancia:
         menu = new App.Collections.Menu();
        menu.fetch()
        luego se recorre con:
        for(var i=0;i<menu.length;i=i+1){
        console.log(menu.at(i).attributes)
        }

        menu.forEach(function(modelo, index, arreglo){
        console.log(modelo.get('nombre'))
        })

        var Coleccion = Backbone.Collection.extend({
        url: '/menu/1'
});

miColeccion.forEach(function(modelo, index, arreglo){
    if(modelo.get("depende_menu_id")==0){
        console.log(modelo.get("nombre"));
        $("#ulMenu").append('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'+ modelo.get("nombre") +'<span class="caret"></span><a><ul '+'id="ul'+modelo.get("id")+'"'+' class="dropdown-menu" role="menu"></ul></li>')
    }
})
•
    */
});

// Otra Prueba para generar menus:
App.Views.VistaCabeceraMenues = Backbone.View.extend({
    plantillaCabeceraMenues: App.Plantilla('pru'),

    initialize: function(){
    this.render();
    },

    render: function(){
    p = this.plantillaCabeceraMenues({nombreMenu: 'hola'});
    console.log(p);
    this.$el.html(p);
    return this;
    }
});

// Vista para el menu Configurar de la cabecera:
App.Views.VistaCabeceraMenu = Backbone.View.extend({
    plantillaCabeceraMenu: App.Plantilla('pruebaPlantilla'),
    plantillaCabeceraMenu2: App.Plantilla('prueba2Plantilla'),

    initialize: function(){
    this.render();
    },

    render: function(){
    suma = this.plantillaCabeceraMenu() + this.plantillaCabeceraMenu2();
    console.log(suma);
    this.$el.html(suma);
    return this;
    }
});

/*// Vista para la cabecera del Index:
App.Views.VistaCabeceraIndex = Backbone.View.extend({
    plantillaCabeceraIndex: App.Plantilla('cabeceraIndexPlantilla'),

    initialize: function(){
    this.render();
    },

    events:{
        'click #action': function(){alert('Hola')}
    },

    render: function(){
    this.$el.html(this.plantillaCabeceraIndex(this.model.toJSON()));
    return this;
    }
});*/

// Vista para el Login del Index:
App.Views.VistaLogin = Backbone.View.extend({
    /**/
    obtenerPlantilla: function(idElemento){
        return App.Plantilla(idElemento);
    },

    verificaSesion: function(usuario){
        /*Este Metodo permite ir al backend y buscar en los cookies
         si el usuario tiene una sesion abierta, dependiendo de esto
         muestra una plantilla HTML */


        if( !usuario ){
            htmlSesionInactiva = Utils.BuscarHtml('tplSesionInactiva');
            this.plantillaLogin = htmlSesionInactiva;
            this.render();
        }
        else{
            self.plantillaLogin = '<a>sesionActiva</a>';
        }
    },

    initialize: function(){
        $.getJSON('consultarSesion', function(respuesta){
            this.user = respuesta.usuario;
        });
        this.verificaSesion(this.user);
    },

    events:{
        'click #btnIniciarSesion': 'iniciarSesion',

        'click #olvidoClave': 'olvidoClave',

        'click #registrate': 'registrarNuevo',

        'click #editarPerfil': 'perfil'
    },

    perfil: function(){
        alert('Editar');
        miSelector = '#divCuerpoIndex';
        alert($('#divCuerpoIndex').html())
        // var miVistaPerfil = new App.Views.Vista.Perfil({el: miSelector, model: this.model});
        this.$(miSelector).html('<a>Hola</a>');

        //this.plantillaLogin = '<a>Hola</a>'
        //this.$(miSelector).html(this.plantillaLogin);
        //this.render();

    },

    iniciarSesion: function(){
        var inUsuario = $('#inputEmail').val();
        var inClave = $('#inputPassword').val();

        dataEnviar = {usuario: inUsuario, clave: inClave}
        response = Usuario.IniciarSesion(dataEnviar)

        var estado = response.status;
        var usuarioId = response.mensaje;

        if( estado ){
            var modelo = Usuario.BuscarUsuarioId(usuarioId);
            htmlSesionActiva = Utils.BuscarHtml('tplSesionActiva');
            var loginOk =  _.template(htmlSesionActiva.trim());
            this.plantillaLogin = loginOk( modelo );
            this.render();
            alert('Sesion iniciada con Exito');
        }
        else{
            alert('Clave Incorrecta');
        }
    },

    render: function(){
        this.$el.html(this.plantillaLogin);
        return this;
    }

});

// Vista para el Cuerpo del Index Parte 1:
App.Views.VistaCuerpoIndexParte1 = Backbone.View.extend({
    plantillaCuerpoIndexParte1: App.Plantilla('cuerpoIndexParte1Plantilla'),

    initialize: function(){
    this.render();
    },

    render: function(){
    this.$el.html(this.plantillaCuerpoIndexParte1(this.model.toJSON()));
    return this;
    }

});

// Vista para el Cuerpo del Index Parte 2:
App.Views.VistaCuerpoIndexParte2 = Backbone.View.extend({
    plantillaCuerpoIndexParte2: App.Plantilla('cuerpoIndexParte2Plantilla'),
    plantillaModal2: App.Plantilla('modal2'),

    initialize: function(){
        this.render();
        $('#txtfechanac').datepicker()
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
        var rgxMovil = /^([0]{1}[4]{1})(12|14|16|24|26)([0-9]{7})$/
        var rgxFnac = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;

        corr = $(objeto).val();
        cla = $('#newpassword').val();
        cla2 = $('#newpassword2').val();
        mov = $('#txtmovil').val();
        fnac = $('#txtfechanac').val();

        if( objeto == '#txtcorreo' ){
            if( !rgxEmail.test( corr) || !corr ){
                errorCampo.estado = true;
                errorCampo.mensaje = 'Correo Invalido'
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
        var lista = $("#registroRapido :input");
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

        var todoBien = true
        // Valores de los Text del FORM
        nom = $('#txtnombre').val();
        ape = $('#txtapellido').val();
        corr = $('#txtcorreo').val();
        cla = $('#newpassword').val();
        cla2 = $('#newpassword2').val();
        mov = $('#txtmovil').val();
        fnac = $('#txtfechanac').val();
        gen = $('input[type=radio]:checked').val();

        var mo = new App.Models.RegistroRapido({
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
        // camposCorrectos = this.validarCampos();

        self = this;

        if(camposVacios){
            mo.save({},{
                success: function(model, response){
                    alert(response.mensaje);
                    self.limpiarCampos();
                },

                error: function(model, response){
                    alert(response.mensaje);
                    self.limpiarCampos();
                }
            });
        }
    },

    render: function(){
    this.$el.html(this.plantillaCuerpoIndexParte2(this.model.toJSON()));
    return this;
    }

});

// Vista para el Pie de pagina del Index:
App.Views.VistaPiePaginaIndex = Backbone.View.extend({
    plantillaPiePagina: App.Plantilla('piePaginaPlantilla'),

    initialize: function(){
    this.render();
    },

    render: function(){
    this.$el.html(this.plantillaPiePagina(this.model.toJSON()));
    return this;
    }

});

// Vista para el Index:
App.Views.Index = Backbone.View.extend({
    // tagName: $('body'),

    el:$('body'),

    miPlantilla: App.Plantilla('index'),  // _.template($('#personaPlantilla').html()) ,

    initialize: function(){
        this.render();
    },

    events: {
        'click #menu-toggle': 'mostrarMenu',
    },

    mostrarMenu: function(e){
        e.preventDefault()
        // this.$('#wrapper').toggleClass('toggled');
        alert('hola');

    },

    render: function(){
        this.$el.html(this.miPlantilla(this.model.toJSON()));

        miSelector = '#divCabeceraIndex';
        var miVistaCabeceraIndex = new Vista.CabeceraIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaCabeceraIndex.render().el);

        miSelector = '#divCuerpoIndex'
        var miVistaCuerpoIndex = new Vista.CuerpoIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaCuerpoIndex.render().el);

        miSelector = '#divPiePaginaIndex';
        var miVistaPiePaginaIndex = new App.Views.VistaPiePaginaIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaPiePaginaIndex.render().el);

        miSelector = '#ulMenu';
        var miVistaCabeceraMenu = new App.Views.VistaCabeceraMenu({el: miSelector, model: this.model});
        var renderizar = miVistaCabeceraMenu.render().el;
        this.$(miSelector).append(miVistaCabeceraMenu.render().el);

        miSelector = '#divInicioSesion'
        var miVistaLogin = new App.Views.VistaLogin({el: miSelector});
        //this.$(miSelector).append(miVistaLogin.render().el);

        miSelector = '#divCuerpoIndexParte1'
        var miVistaCuerpoIndexParte1 = new App.Views.VistaCuerpoIndexParte1({el: miSelector, model: this.model});
        console.log(miVistaCuerpoIndexParte1.render().el)
        this.$(miSelector).append(miVistaCuerpoIndexParte1.render().el);

        miSelector = '#divCuerpoIndexParte2'
        var miVistaCuerpoIndexParte2 = new App.Views.VistaCuerpoIndexParte2({el: miSelector, model: this.model});
        console.log(miVistaCuerpoIndexParte2.render().el)
        this.$(miSelector).append(miVistaCuerpoIndexParte2.render().el);
    }
});

var indexModelo = new App.Models.Index()
var indexView = new App.Views.Index({model: indexModelo});

})()
