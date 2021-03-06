var Models = Models || {};

// Modelo para datos del usuario
    Models.DatosUsuario = Backbone.Model.extend({
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

