import psycopg2
import os
import time
import datetime

class pg():

    '''Nueva clase para manejar postgreSQL '''

    def __init__(self):
        '''Por ahora solo se inicializan variables en el init '''

        self.cur = ''
        self.conn = ''
        self.estadoConexion = {'status': 0, 'mensaje': ''}
        self.cad_conex = ''

    def conectar(self):
        ''' parametros 1: string "Cadena de conexion"
        Metodo que permite conectar a postgresql
        '''

        try:
            servidor = os.environ['servidor']
            basedatos = os.environ['basedatos']
            usuario = os.environ['usuario']
            clave = os.environ['clave']
        except:
            servidor = ''
            basedatos = ''
            usuario = ''
            clave = ''

        string_conn = "host='{0}' dbname='{1}' user='{2}' password='{3}' ".format(servidor, basedatos, usuario, clave)
        self.cad_conex = string_conn

        try:
            self.conn = psycopg2.connect(string_conn)
            self.cur = self.conn.cursor()
            self.estado = {'status': 1, 'mensaje': 'Conexion Exitosa'}
        except psycopg2.Error as e:
            self.estado = {'status': 0, 'mensaje': e.message}

    def ejecutar(self, cadSelect):
        '''Metodo que permite hacer los Select o Insert a postgresql '''

        # self.estadoConexion = {'status': 0, 'mensaje': ''}
        cadSelectSql = cadSelect

        if self.estado['status']:
            try:
                self.cur.execute(cadSelectSql)
                self.estado = {'status': 1, 'mensaje': 'Comando Ejecutado con Exito'}

            except psycopg2.Error as e:
                self.estado = {'status': 0, 'mensaje': e.message}
# Prueba
def testPG():
    ''' '''
    posg = pg()
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

    posg = pg()
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

def validaLogin(usuario, clave):

    ''' parametros recibidos 2:
    (string usuario, string clave)
    Metodo para validar el inicio de sesion
    contra la base de datos'''

    lcUsuario = usuario.strip()
    lcClave = clave.strip()
    accesoPermitido = False
    registros = []
    objDevolver = {'devolver': [{'status': 0, 'mensaje': 'Error'}, {}]}

    posg = pg()
    posg.conectar()
    print(posg.estado['mensaje'])

    # Se verifica el estado de la conexion
    if posg.estado["status"]:
        sql = "select id from usuario where (usuario = '{0}' and clave = '{1}')".format(lcUsuario, lcClave)
        posg.ejecutar(sql)

        # Se verifica el estado del Select SQL
        if posg.estado["status"]:
            registros = posg.cur.fetchall()
            if registros:
                bottle.response.set_cookie("account", lcUsuario)
                accesoPermitido = True
            else:
                bottle.response.set_cookie("account", '')
    return accesoPermitido, registros

