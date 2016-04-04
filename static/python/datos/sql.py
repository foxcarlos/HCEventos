from static.python.libs import pgSQL
import datetime

def testPG():
    '''Metodo para Testing de la conexion '''

    posg = pgSQL.PG()
    posg.conectar()

    # Si la comnexion a la base de datos falla
    if not posg.estado['status']:
        devuelveMsg = posg.estado
    else:
        devuelveMsg = 'Todo Bien'
    return devuelveMsg

def crearRegRapido(nombre='', apellido='', correo='', clave='', fechanac='', genero=''):
    '''Este metodo permite guardar los datos en postgreSQL  invocado por el metodo POST /registro'''

    devuelveMsg = {'status': 0, 'mensaje': ''}
    Nombre = nombre.strip()
    Apellido = apellido.strip()
    Correo = correo.strip()
    Clave = clave.strip()
    FechaNac = datetime.datetime.strptime(fechanac.strip(), "%d/%m/%Y").strftime('%Y/%m/%d')
    Genero = genero.strip()

    posg = pgSQL.PG()
    posg.conectar()

    # Si la comnexion a la base de datos falla
    if not posg.estado['status']:
        devuelveMsg = posg.estado
    else:
        # Verificar si el Usuario ya esta registrado
        sql = "select login from seguridad.usuarios where login ='{0}'".format(Correo)
        posg.ejecutar(sql)

        # Si hay un fallo al ejecutar el comando sql
        if not posg.estado['status']:
            devuelveMsg = posg.estado
        else:
            registros = posg.cur.fetchall()

            if registros:
                devuelveMsg = {'status': 0, 'mensaje': 'Usuario ya esta registrado'}
            else:
                # Si no esta registrado se procede a agregarlo a la base de datos
                armarInsert = "insert into seguridad.usuarios (login, clave ) values ('{0}', '{1}')".format(Correo, Clave)
                posg.ejecutar(armarInsert)

                # Si falla el comando SQl al insertar
                if not posg.estado['status']:
                    devuelveMsg = posg.estado
                else:
                    # Se obtiene el Id unico que se genero automaticamente en PGSQL
                    obtenerID = "SELECT currval(pg_get_serial_sequence('seguridad.usuarios','id'))"
                    posg.ejecutar(obtenerID)

                    # Si falla al obntener el ID Unico
                    if not posg.estado['status']:
                        devuelveMsg = posg.estado
                    else:
                        idDevuelto = posg.cur.fetchall()
                        idUsuario = idDevuelto[0][0]

                        # Ahora se procede a insertar el resto de los valores en la tabla persona
                        sqlInsertpersona = "insert into persona (usuario, nombres, apellidos, fechanac,\
                        genero_sexo) values({0}, '{1}', '{2}', '{3}', {4})".\
                            format(idUsuario, Nombre, Apellido, FechaNac, Genero)

                        print(sqlInsertpersona)

                        posg.ejecutar(sqlInsertpersona)
                        if not posg.estado['status']:
                            devuelveMsg = posg.estado
                        else:
                            posg.conn.commit()
                            devuelveMsg = {'status': 1, 'mensaje': 'Usuario registrado con exito, ahora puede iniciar sesion'}
    return devuelveMsg

def validaLogin(usuario='', clave=''):

    ''' parametros recibidos 2:
    (string usuario, string clave)
    Metodo para validar el inicio de sesion
    contra la base de datos'''

    lcUsuario = usuario.strip()
    lcClave = clave.strip()
    registros = []
    devuelveMsg = {'status': 0, 'mensaje': ''}

    posg = pgSQL.PG()
    posg.conectar()

    # El status de la conexio a la base de datos
    estado = posg.estado['status']
    mensaje = posg.estado['mensaje']

    # Si la comnexion a la base de datos falla
    if not posg.estado['status']:
        devuelveMsg = {'status': estado, 'mensaje': mensaje}
    else:
        sql = "select id from seguridad.usuarios where login = '{0}' and clave = '{1}'".format(lcUsuario, lcClave)
        posg.ejecutar(sql)

        # Se verifica el estado del Select SQL
        if posg.estado["status"]:
            registros = posg.cur.fetchall()

            if registros:
                devuelveMsg = {'status': 1, 'mensaje': registros[0][0]}
            else:
                devuelveMsg = {'status': 0, 'mensaje': 'Usuario o clave invalida'}
        else:
            # Si falla el status de la Sentencia SQL
            estado = posg.estado['status']
            mensaje = posg.estado['mensaje']
            devuelveMsg = {'status': estado, 'mensaje': mensaje}

    return devuelveMsg

def buscarUsuario(idUsuario):
    ''' '''

    registros = []
    devuelveMsg = {'status': 0, 'mensaje': ''}

    posg = pgSQL.PG()
    posg.conectar()

    # El status de la conexio a la base de datos
    estado = posg.estado['status']
    mensaje = posg.estado['mensaje']

    # Si la comnexion a la base de datos falla
    if not posg.estado['status']:
        devuelveMsg = {'status': estado, 'mensaje': mensaje}
    else:

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
        pais.descripcion AS pais,
        direcc.id_estado,
        estado.descripcion AS estado,
        direcc.id_ciudad,
        ciudad.descripcion AS ciudad,
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

        sql = "select usuario as usuario_id, nombreUsuario, nombres, apellidos from vdatospersona2 where usuario = {0}".format(idUsuario)
        posg.ejecutar(sql)

        # Se verifica el estado del Select SQL
        if posg.estado["status"]:
            registros = posg.cur.fetchall()

            if registros:
                devuelveMsg = {'status': 1, 'mensaje': registros[0]}
            else:
                devuelveMsg = {'status': 0, 'mensaje': 'Sin Informacion'}
        else:
            # Si falla el status de la Sentencia SQL
            estado = posg.estado['status']
            mensaje = posg.estado['mensaje']
            devuelveMsg = {'status': estado, 'mensaje': mensaje}

    return devuelveMsg
