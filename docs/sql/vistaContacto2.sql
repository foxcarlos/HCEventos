CREATE OR REPLACE VIEW vdatospersona2 AS 
 SELECT p.id,
    p.tipo_identidad,
    identidad.descripcion AS tipoidentidad,
    p.cedula_passp,
    p.nombres,
    p.apellidos,
    to_char(p.fechanac::timestamp with time zone, 'YYYY-MM-DD'::text) AS fechanac,
    p.genero_sexo,
    sexo.descripcion AS genero,
    p.nacionalidad,
    nacional.descripcion AS nacionalidad2,
    p.edo_civil,
    edocivil.descripcion AS edocivil,
    p.direccion,
    direcc.id_pais,
    pais.descripcion as Pais,
    direcc.id_estado,
    estado.descripcion as Estado,
    direcc.id_ciudad,
    ciudad.descripcion as Ciudad,
    direcc.direccion AS direccionpersonal,
    p.contacto,
    infpersonal.telefono_movil AS infcontactomovil,
    infpersonal.telefono_habitacion AS infcontactelef,
    infpersonal.email AS infcontacemail,
    infpersonal.twitter AS infcontactwitter,
    infpersonal.instagram AS infcontacinstagram,
    p.laboral,
    inflaboral.cargo,
    inflaboral.institucion AS institucionlaboral,
    inflaboral.direccion AS direccionlaboral,
    inflaboral.telefono AS telefonolaboral,
    inflaboral.fax AS faxlaboral,
    inflaboral.email AS emaillaboral,
    inflaboral.web AS weblaboral,
    inflaboral.twitter AS twitterlaboral,
    p.profesion,
    infprofesional.id_nivelacademico,
    nivelacademico.descripcion,
    infprofesional.id_especialidad,
    infprofesional.institucion AS profesioninstitucion,
    infprofesional.direccion AS profesiondireccion,
    p.usuario,
    usu.login AS nombreusuario
   FROM persona p
     LEFT JOIN referencias.tipo_identidad identidad ON p.tipo_identidad = identidad.id
     LEFT JOIN referencias.genero_sexo sexo ON p.genero_sexo = sexo.id
     LEFT JOIN referencias.nacionalidad nacional ON p.nacionalidad = nacional.id
     LEFT JOIN referencias.edo_civil edocivil ON p.edo_civil = edocivil.id
     LEFT JOIN direccion direcc ON direcc.id = p.direccion
     LEFT JOIN referencias.pais pais ON pais.id = direcc.id_pais
     LEFT JOIN referencias.estado estado ON estado.id = direcc.id_estado
     LEFT JOIN referencias.ciudad ciudad ON ciudad.id = direcc.id_ciudad
     LEFT JOIN informacion_personal infpersonal ON p.contacto = infpersonal.id
     LEFT JOIN informacion_laboral inflaboral ON p.laboral = inflaboral.id
     LEFT JOIN informacion_profesional infprofesional ON p.profesion = infprofesional.id
     LEFT JOIN referencias.nivelacademico nivelacademico ON nivelacademico.id = infprofesional.id_nivelacademico
     LEFT JOIN seguridad.usuarios usu ON p.usuario = usu.id;

ALTER TABLE vdatospersona2
  OWNER TO postgres;
