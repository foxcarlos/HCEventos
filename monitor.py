__author__ = 'FoxCarlos'

import time
import os
import json
import bottle
from bottle.ext.websocket import GeventWebSocketServer
from static.python.datos import sql
from static.python.notificar import notificar
from bson.objectid import ObjectId
from os.path import join, dirname
from bottle import route, static_file, template
import datetime
from static.python.libs import pgSQL


@bottle.route('/congreso')
def congreso():
    # return bottle.template('congreso.html')
    web = "http://congresoshospitalcoromoto.blogspot.com"
    bottle.redirect(web)

@bottle.route('/static/<filename:path>')
def static(filename):
    return bottle.static_file(filename, root='static/')


@bottle.route('/js/<filename:path>')
def static(filename):
    return bottle.static_file(filename, root='js/')

@bottle.route('/')
def index():
    #usuario = ''
    #bottle.response.set_cookie("account", usuario)
    username = bottle.request.get_cookie("account")

    #print('usuario',username)
    return bottle.template('index', {'usuario':username})

@bottle.route('/salir')
def salir():
    usuario = ''
    bottle.response.set_cookie("account", usuario)
    username = bottle.request.get_cookie("account")
    print('usuario',username)
    return bottle.template('index')

@bottle.route('/consultarSesion')
def login():
    '''API REST que permite obtener la cookie
    del usuario que tiene la sesion activa
    actualmente'''

    username = bottle.request.get_cookie("account")
    respuesta = {'usuario': username}
    return json.dumps(respuesta)

@bottle.post('/iniciarSesion')
def loginp():
    ''' Metodo para el inicio de Sesion'''

    usuario = ''
    clave = ''
    acceso = False

    recibido = bottle.request.json
    print(recibido)

    usuario = recibido['usuario']
    clave = recibido['clave']

    acceso = sql.validaLogin(usuario, clave)
    print(acceso)

    if acceso['status']:
        # Verifica si el usuario tiene datos del registro incompleto
        # incompleto = validaRegistroIncompleto(int(idUsuario[0][0]))

        bottle.response.set_cookie("account", usuario)
        msg = acceso
    else:
        bottle.response.set_cookie("account", '')
        msg = acceso

    return json.dumps(msg)

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

@bottle.route('/menu/:id')
def estado(id=0):
    posg = pgSQL.PG()
    posg.conectar()
    List2Dict = {}

    if not clasePG.estado['status']:
        print('error')
        pass  # por ahora no se enviara nimgun mensaje de error
    else:
        # Verifica los datos en a tabla persona para el ID pasado como parametro
        sqlVerificaDatos = '''select id, orden,nombre,depende_menu_id from menu where id in (
                select menu_id from seguridad.permisos AS sp
                where
                sp.status = 1 and
                sp.rol_id in (
                    select rol_id from seguridad.usuario_rol AS ur where ur.usuario_id = {0} and ur.status = 1)) order by orden
        '''.format(id)


        # sqlVerificaDatos = "select id, descripcion from referencias.estado where id_pais='{0}' order by descripcion".format(id)
        posg.sql(sqlVerificaDatos)
        if clasePG.estado['status']:
            buscar = clasePG.cur.fetchall()
            de_Lista_a_Diccionario = [{'id':i[0], 'orden':i[1], 'nombre':i[2], 'depende_menu_id':i[3]} for i in buscar]
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

@bottle.post('/crearRegistroRapido')
def registroPost():
    '''Metodo POST que recibe informacion del FrontEnd
    cuando se crea un nuevo usuario desde el sitio Web
    '''
    recibido = bottle.request.json

    nombre = recibido['nombre']
    apellido = recibido['apellido']
    correo = recibido['correo']
    clave = recibido['clave']
    movil = recibido['movil']
    fechanac = recibido['fechaNac']
    genero = recibido['genero']

    print(nombre, apellido, correo, clave, movil, fechanac, genero)
    insReg = sql.crearRegRapido(nombre, apellido, correo, clave, fechanac, genero)
    print(insReg)

    if insReg['status']:
        cuerpoMensaje = 'Saludos {0}, Registro exitoso en Eventos del Hospital Coromoto, su usuario es: {1} y su clave de acceso es: {2}'.format(nombre, correo, clave)
        # ' Lo invitamos a concluir su registro iniciando sesion y completando los datos faltantes'.format(nombre, apellido, correo, clave)
        remitenteMensaje = ''
        asuntoMensaje = 'Registro realizado con Exito'

        # notificar.enviarEmail(correo, cuerpoMensaje, remitenteMensaje, asuntoMensaje)
        notificar.sms(cuerpoMensaje, movil)
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



# bottle.debug(True)
bottle.run(host='0.0.0.0', port=8086, server=GeventWebSocketServer, reloader = True)
