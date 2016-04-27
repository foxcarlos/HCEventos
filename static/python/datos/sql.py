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
    '''parametros recibidos 2:
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
    '''parametros:int ID usuario,
    Metodo que permite buscar toda la informacion de un usuario
    recibe un ID como parametro'''

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
        sql = "SELECT row_to_json(vdatospersona) FROM vdatospersona where id_usuario = {0}".format(idUsuario)
        posg.ejecutar(sql)

        # Se verifica el estado del Select SQL
        if posg.estado["status"]:
            registros = posg.cur.fetchall()
            print(registros[0])

            if registros:
                devuelveMsg = {'status': 1, 'mensaje': registros[0]}
            else:
                devuelveMsg = {'status': 0, 'mensaje': 'Sin Informacion'}
        else:
            # Si falla el status de la Sentencia SQL
            estado = posg.estado['status']
            mensaje = posg.estado['mensaje']
            devuelveMsg = {'status': estado, 'mensaje': mensaje[0]}

    return devuelveMsg

def editarUsuarios(idUsuario, clave):
    '''parametros:2,
    int ID usuario,
    string: clave.
    Metodo que cambiar la clave del usuario'''

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
        sql = "UPDATE seguridad.usuarios set clave = '{0}' where id_usuario = {1}".format(clave, idUsuario)
        posg.ejecutar(sql)

        # Se verifica el estado del Select SQL
        if posg.estado["status"]:
            registros = posg.cur.fetchall()
            print(registros[0])

            if registros:
                devuelveMsg = {'status': 1, 'mensaje': registros[0]}
            else:
                devuelveMsg = {'status': 0, 'mensaje': 'Sin Informacion'}
        else:
            # Si falla el status de la Sentencia SQL
            estado = posg.estado['status']
            mensaje = posg.estado['mensaje']
            devuelveMsg = {'status': estado, 'mensaje': mensaje[0]}

    return devuelveMsg
