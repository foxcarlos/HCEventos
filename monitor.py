__author__ = 'FoxCarlos'

import time
import os
import json
import bottle
from bottle.ext.websocket import GeventWebSocketServer
from bson.objectid import ObjectId
from os.path import join, dirname
from bottle import route, static_file, template
import datetime
import re
import psycopg2


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
            self.estado = {'status': 0, 'mensaje': e}

    def ejecutar(self, cadSelect):
        '''Metodo que permite hacer los Select o Insert a postgresql '''

        # self.estadoConexion = {'status': 0, 'mensaje': ''}
        cadSelectSql = cadSelect

        if self.estado['status']:
            try:
                self.cur.execute(cadSelectSql)
                self.estado = {'status': 1, 'mensaje': 'Comando Ejecutado con Exito'}

            except psycopg2.Error as e:
                self.estado = {'status': 0, 'mensaje': e}

def guardarPostGreSQL(nombre='', apellido='', correo='', clave='', dia='', mes='', anio='', genero=''):
    '''Este metodo permite guardar los datos en postgreSQL
    invocado por el metodo POST /registro'''

    devuelveMsg = {'status': 0, 'mensaje': ''}

    varNombre = nombre.strip()
    varApellido = apellido.strip()
    varCorreo = correo.strip()
    varClave = clave.strip()
    varDia = dia.strip()
    varMes = mes.strip()
    varAnio = anio.strip()
    varGenero = genero.strip()

    posg = pg()
    posg.conectar()

    # Si la comnexion a la base de datos falla
    if not posg.estado['status']:
        devuelveMsg = posg.estado
    else:
        # Verificar si el Usuario ya esta registrado
        sql = "select usuario from usuario where usuario ='{0}'".format(varCorreo)
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
                armarInsert = "insert into usuario (usuario, clave ) values ('{0}', '{1}')".format(varCorreo, varClave)
                posg.ejecutar(armarInsert)

                # Si falla el comando SQl al insertar
                if not posg.estado['status']:
                    devuelveMsg = posg.estado
                else:
                    # Se obtiene el Id unico que se genero automaticamente en PGSQL
                    obtenerID = "SELECT currval(pg_get_serial_sequence('usuario','id'))"
                    posg.ejecutar(obtenerID)

                    # Si falla al obntener el ID Unico
                    if not posg.estado['status']:
                        devuelveMsg = posg.estado
                    else:
                        idDevuelto = posg.cur.fetchall()
                        idUsuario = idDevuelto[0][0]

                        # validar que la fecha recibida desde el html viene bien, en caso
                        # de venir mal se toma la fecha del monento
                        fechaNacArmar = '{0}/{1}/{2}'.format(varAnio, varMes, varDia)
                        try:
                            time.strptime(fechaNacArmar, '%Y/%m/%d')
                        except ValueError:
                            f = datetime.datetime.now()
                            fechaNacArmar = '{0}/{1}/{2}'.format(f.year, f.month, f.day)
                            print(fechaNacArmar)

                        # Ahora se procede a insertar el resto de los valores en la tabla persona
                        sqlInsertpersona = "insert into persona (usuario, nombres, apellidos, fechanac,\
                        genero_sexo) values({0}, '{1}', '{2}', '{3}', {4})".format(idUsuario, varNombre, varApellido, fechaNacArmar, varGenero)
                        posg.ejecutar(sqlInsertpersona)
                        if not posg.estado['status']:
                            devuelveMsg = posg.estado
                        else:
                            posg.conn.commit()
                            devuelveMsg = {'status': 1, 'mensaje':'Usuario registrado con exito, ahora inicie sesion'}
    return devuelveMsg

def validaLogin(usuario, clave):
    ''' parametros recibidos 2:
    (string usuario, string clave)
    Metodo para validar el inicio de sesion
    contra la base de datos
    '''

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


@bottle.route('/congreso')
def congreso():
    # return bottle.template('congreso.html')
    web = "http://congresoshospitalcoromoto.blogspot.com"
    bottle.redirect(web)

@bottle.route('/static/<filename:path>')
def static(filename):
    return bottle.static_file(filename, root='static/')

@bottle.route('/editarRegistro')
def editarRegistro():
    '''Permite consultar en la base de datos si el usuario
    que inicio sesion tiene datos en el registro
    Devuelve un json con la siguiente esctructura:
        un json con una lista dentro que a su vez esta lista tiene 2
        JSON dentro, EJ:
        {"devuelto":[{'status':0, 'mensaje':'registros devuelto con exito'}, {campos con el registro}]}
    '''

    username = bottle.request.get_cookie("account").upper()
    dicc = {}
    diccionario = {}

    posg = pg()
    posg.conectar()
    print(posg.estado)

    if posg.estado["status"]:
        sql = "select id from usuario where upper(usuario) = '{0}'".format(username)
        posg.ejecutar(sql)

        if posg.estado["status"]:
            registros = posg.cur.fetchall()
            if registros:
                idUsuario = registros[0][0]
                sqlSelectVista = "select *from vdatospersona where usuario = {0}".format(idUsuario)
                posg.ejecutar(sqlSelectVista)

                vista = posg.cur.fetchall()

                if vista:
                    cabecera = [col[0] for col in posg.cur.description]
                    dicc = dict(zip(cabecera, vista[0]))
                    diccionario = {'status':1, 'mensaje':'OK', 'valores':dicc}
                else:
                    msgError = "El usaurio:{0}, no tiene registros en la vista 'vdatospersona'".format(username)
                    diccionario = {'status':0, 'mensaje':msgError, 'valores':dicc}
            else:
                msgError = 'El usuario:{0} no tiene registros en la tabla "usuario"'.format(username)
                diccionario = {'status':0, 'mensaje':msgError, 'valores':{}}
    else:
        msgError = posg.estado["mensaje"]
        print(type(msgError))
        diccionario = {'status':0, 'mensaje':msgError, 'valores': {}}
        print(diccionario)

    return json.dumps(diccionario)

@bottle.route('/cargarRegistro')
def registro():

    return bottle.template('registro.html')

@bottle.route('/cargarJumbotron')
def jumbotron():
    return bottle.template('index')

@bottle.route('/cargarMenuOtro')
def menuPrincipal():
    return bottle.template('menuOtro.html')

@bottle.route('/cargarPiePagina')
def piePagina():
    return bottle.template('piePaginaPrincipal.html')

@bottle.route('/cargarInicioSesion')
def inicioSesion():
    '''Este metodo se ejecuta cuando se inicia
    el index y no se consigue ningun usuario en la cookie
    qquw haya iniciado sesion, entonces procede a cargar
    mediante un load de jquery el form para que pueda
    iniciar sesion'''
    # nota: mas adelante de  hara en un solo metodo

    # username = bottle.request.get_cookie("account")
    return bottle.template('frmInicioSesion.html')

@bottle.route('/cargarCerrarSesion')
def cerrarSesion():
    username = bottle.request.get_cookie("account")

    return bottle.template('cerrarSesion.html', {'usuario':username})

@bottle.route('/salir')
def salir():
    usuario = ''
    bottle.response.set_cookie("account", usuario)
    username = bottle.request.get_cookie("account")
    print('usuario',username)
    return bottle.template('index')

@bottle.route('/')
def index():
    # usuario = ''
    # bottle.response.set_cookie("account", usuario)
    username = bottle.request.get_cookie("account")

    # print('usuario',username)
    return bottle.template('index', {'usuario':username})

@bottle.route('/login')
def login():

    username = bottle.request.get_cookie("account")
    print('El usuario es:',username)
    return bottle.template('login')

@bottle.post('/login')
def loginp():
    ''' Metodo para el inicio de Sesion'''

    usuario = ''
    clave = ''
    idUsuario = False

    usuario = bottle.request.forms.get('txtEmail')
    clave = bottle.request.forms.get('txtClave')

    acceso, idUsuario = validaLogin(usuario, clave)

    if acceso:
        # Verifica si el usuario tiene datos del registro incompleto
        # incompleto = validaRegistroIncompleto(int(idUsuario[0][0]))

        msg = 'Sesion iniciada con exito'
        stat = 1
    else:
        stat = 0
        msg = 'El usuario o la clave es invalida'
    return json.dumps({'status':stat, 'mensaje':msg})

@bottle.route('/ciudad/:idEstado')
def ciudad(idEstado=0):
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.ciudad where id_estado='{0}' order by descripcion".format(idEstado)
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/estado/:id')
def estado(id=0):
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.estado where id_pais='{0}' order by descripcion".format(id)
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/especialidad')
def especialidad():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.especialidad "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/nivelacademico')
def profesion():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.nivelacademico "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/pais')
def pais():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.pais "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/edoCivil')
def edoCivil():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.edo_civil "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/nacionalidad')
def nacionalidad():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.nacionalidad "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.route('/genero')
def genero():
    clasePG = pg()
    clasePG.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = "select id, descripcion from referencias.genero_sexo "
        clasePG.ejecutar(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'descripcion':i[1]} for i in buscar]
            List2Dict = de_Lista_a_Diccionario
    return json.dumps(List2Dict)

@bottle.post('/registro')
def registroPost():
    '''Metodo POST que recibe informacion del FrontEnd
cuando se crea un nuevo usuario desde el sitio Web'''

    # print(bottle.request.forms.getall('registroRapido'))
    nombre = bottle.request.forms.get('txtnombre')
    apellido = bottle.request.forms.get('txtapellido')
    correo = bottle.request.forms.get('txtcorreo')
    clave = bottle.request.forms.get('newpassword')
    dia = bottle.request.forms.get('txtdia')
    mes = bottle.request.forms.get('txtmes')
    anio = bottle.request.forms.get('txtanio')
    genero = bottle.request.forms.get('txtgenero')

    print(nombre, apellido, correo, clave, dia, mes, anio, genero)

    # Se envian los datos a guardar en PostGres y devuelve una tupla
    # (numerico,cadena) donde 0 indica que hubo un error y uno que
    # se ejecuto satisfatoriamente y otro elemento con el mensaje
    # bien sea giardado con exito o usuario ya existe
    insReg = guardarPostGreSQL(nombre, apellido, correo, clave, dia,mes, \
        anio, genero)
    print(insReg)

    return json.dumps(insReg)

def validaRegistroIncompleto(id=''):
    ''' '''
    idUsuario = id
    clasePG = ConectarPG("host='10.121.6.4' dbname='evento' user='admhc' password='shc21152115'")

    # Verifica los datos en a tabla persona para el ID pasado como parametro
    sqlVerificaDatos = "select *from persona where usuario = '{0}'".format(idUsuario)
    print(sqlVerificaDatos)
    buscar = clasePG.ejecutar(sqlVerificaDatos)
    print(buscar)
    return buscar


@bottle.get('/grid')
def grid():
    # Busca en mongodb el objetoId del usuario que inicio sesion
    usuario = bottle.request.get_cookie("account")
    objetoUsuarioId = buscarUsuarioId(usuario)

    appBuscar = consultaM()
    appBuscar.abrirColeccion('contactos')

    camposMostrar = ('_id', 'nombre', 'apellido')
    condicion = {'usuario_id':objetoUsuarioId}
    ordenadoPor = 'nombre'

    # appBuscar realiza la consulta y devuelve una lista con diccionarios por cada registro
    
    doc = appBuscar.consulta(camposMostrar, condicion, ordenadoPor)
    listaFinal = [f.values() for f in doc]

    return bottle.template('grid1', {'grid':listaFinal, 'cabecera':camposMostrar})

"""
@bottle.route('/mensaje')
def mensaje():
    return '''
        <form action="/mensaje" method="post"'>
            Numero: <input name="numero" type="text" />
            Mensaje: <input name="mensaje" type="text" />
            <input value="Enviar Sms" type="submit" />
        </form>
    '''
"""

@route('/my_ip')
def show_ip():
    ip = bottle.request.environ.get('REMOTE_ADDR')
    # or ip = request.get('REMOTE_ADDR')
    # or ip = request['REMOTE_ADDR']
    print(ip)
    return template("Your IP is: {{ip}}", ip=ip)

def validaSms(num, msg):
    devuelve = True
    if not num:
        devuelve = False
    elif not msg:
        devuelve = False
    elif len(num) !=11:
        devuelve = False
    elif num[:4] not in ['0426', '0416', '0414', '0424', '0412']:
        devuelve = False

    # Esta Opcion es temporal para poder enviar yo Mensajes Internacionales
    usuario = bottle.request.get_cookie("account")
    if usuario == 'foxcarlos':
        devuelve = True

    return devuelve


# bottle.debug(True)
bottle.run(host='0.0.0.0', port=8086, server=GeventWebSocketServer, reloader = True)
