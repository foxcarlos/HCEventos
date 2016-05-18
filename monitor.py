#!/usr/bin/python
# -*- coding: utf-8 -*-
__author__ = 'FoxCarlos'


import json
import bottle
from bottle.ext.websocket import GeventWebSocketServer
from static.python.datos import sql
from static.python.notificar import notificar
import time

# ---------------------------------------
# Ejemplo CRUD
# ---------------------------------------


@bottle.route('/restapi/<id>')
def raget(id):
    print('Entro al GET', id)
    model = {'model': 'Modelo'}
    return model


@bottle.post('/restapi')
def rapost():
    recibido = bottle.request.json
    print('Entro al POST', recibido)
    model = {'model': 'Modelo'}
    return model


@bottle.put('/restapi/<id>')
def raPUT(id):
    print('Entro al PUT', id)
    model = {'model': 'Modelo'}
    return model


@bottle.delete('/restapi/<id>')
def raDEL(id):
    print('Entro al DEL', id)
    model = {'model': 'Modelo'}
    return model

# ---------------------------------------


@bottle.route('/congreso')
def congreso():
    # return bottle.template('congreso.html')
    web = "http://congresoshospitalcoromoto.blogspot.com"
    bottle.redirect(web)


@bottle.route('/static/<filename:path>')
def static(filename):
    return bottle.static_file(filename, root='static/')


@bottle.route('/js/<filename:path>')
def static2(filename):
    return bottle.static_file(filename, root='js/')

# ------------------------------------------------------------------------------
# Plantillas HTML
# ------------------------------------------------------------------------------


@bottle.route('/tplSesionInactiva')
def sesionInactiva():
    ''' '''
    return bottle.static_file("sesionInactiva.html", root='js/templates/')


@bottle.route('/tplSesionActiva')
def sesionActiva():
    ''' '''
    return bottle.static_file("sesionActiva.html", root='js/templates/')


@bottle.route('/tplCabeceraIndex')
def cabeceraIndex():
    ''' '''
    return bottle.static_file("cabeceraIndex.html", root='js/templates/')


@bottle.route('/tplMenuPrincipal')
def menuPrincipal():
    ''' '''
    return bottle.static_file("menuPrincipal.html", root='js/templates/')


@bottle.route('/tplCuerpoIndex')
def cuerpoIndex():
    ''' '''
    return bottle.static_file("cuerpoIndex.html", root='js/templates/')


@bottle.route('/tplCuerpoIndexParte1')
def cuerpoIndexP1():
    ''' '''
    return bottle.static_file("cuerpoIndexParte1.html", root='js/templates/')


@bottle.route('/tplCuerpoIndexParte2')
def cuerpoIndexP2():
    ''' '''
    return bottle.static_file("cuerpoIndexParte2.html", root='js/templates/')


@bottle.route('/tplPiePaginaIndex')
def piePagina():
    ''' '''
    return bottle.static_file("piePaginaIndex.html", root='js/templates/')


@bottle.route('/tplPerfil')
def perfilx():
    ''' '''
    return bottle.static_file("perfilNuevo.html", root='js/templates/')


@bottle.route('/tplPerfilCambiarClave')
def cambiarClave():
    ''' '''
    return bottle.static_file("perfilCambiarClave.html", root='js/templates/')


@bottle.route('/tplPerfilCambiarDatosPersonales')
def cambiarDatosP():
    ''' '''
    return bottle.static_file("perfilDatosPersonales.html", root='js/templates/')


@bottle.route('/tplOkModal')
def modal():
    ''' '''
    return bottle.static_file("okModal.html", root='js/templates/')

# ------------------------------------------------------------------------------
# FIN de Plantillas
# ------------------------------------------------------------------------------


@bottle.route('/')
def index():
    # usuario = ''
    # bottle.response.set_cookie("account", usuario)
    # username = bottle.request.get_cookie("account")

    # print('usuario',username)
    return bottle.static_file("index.html", root='')


@bottle.route('/salir')
def salir():
    usuario = ''
    bottle.response.set_cookie("account", usuario)
    # username = bottle.request.get_cookie("account")
    # return bottle.template('index')
    return


@bottle.route('/consultarSesion')
def login():
    '''API REST que permite obtener la cookie
    del usuario que tiene la sesion activa
    actualmente'''

    username = bottle.request.get_cookie("account")
    respuesta = {'usuario': username}
    print('##########################################################')
    print('consultar sesion devuelve la cookie {0}'.format(respuesta))
    print('##########################################################')
    return json.dumps(respuesta)


@bottle.post('/iniciarSesion')
def loginp():
    ''' Metodo para el inicio de Sesion'''

    usuario = ''
    clave = ''
    msg = {"status": 0, "mensaje": ''}

    recibido = bottle.request.json

    usuario = recibido['usuario']
    clave = recibido['clave']

    # Consulta la Base de Datos
    acceso = sql.validaLogin(usuario, clave)

    print('##########################################################')
    print('Lo que devuelve /iniciarSesion', acceso)
    print('##########################################################')

    if acceso['status']:
        # Verifica si el usuario tiene datos del registro incompleto
        # incompleto = validaRegistroIncompleto(int(idUsuario[0][0]))

        # Lo que devuelev eel metodo validaLogin()
        IdUsuario = acceso['mensaje']
        bottle.response.set_cookie("account", str(IdUsuario), expires=(int(time.time()) + 3600))
        msg = acceso
    else:
        bottle.response.set_cookie("account", '')
        msg = acceso

    return json.dumps(msg)


@bottle.route('/datosUsuario/<idUsuario>')
def getUsuario(idUsuario):
    '''Metodo que permite buscar datos del usaurio para el inicio de sesion '''

    msg = {"status": 0, "mensaje": ''}
    recibido = idUsuario

    # Consulta la Base de Datos
    buscar = sql.buscarUsuario(recibido)

    if buscar['status']:
        # Si todo salio bien, obtengo el registro que devuelve
        registros = buscar['mensaje'][0]
        campos = ['id', 'usuario', 'nombre', 'apellido']

        mensajeDict = dict(zip(campos, registros))
        msg = {"status": buscar['status'], "mensaje": mensajeDict}
    else:
        msg = buscar

    msg = registros  # mensajeDict
    return json.dumps(msg)


@bottle.put('/usuario/<idUsuario>')
def putUsuario(idUsuario):
    '''Metodo que permite cambiar la contrasena del usuario '''

    msg = {"status": 0, "mensaje": ''}
    recibidoParam = (bottle.request.json)
    recibidoId = idUsuario
    recibidoClave = recibidoParam['clave']

    # Consulta la Base de Datos
    editar = sql.editarUsuarios(recibidoId, recibidoClave)

    if editar['status']:
        msg = {"status": editar['status'], "mensaje": "Contraseña cambiada con exito"}
        return json.dumps(msg)
    else:
        print('Algo no salio bien al intentar cambiar la clave del usuario')
        msg = editar
    return json.dumps(msg)


@bottle.get('/tipo_identidad')
def GetTipoIdentidad():
    '''Metodo que permite Buscar todos los registros de la tabla tipo_identidad '''
    '''SELECT row_to_json(tipo_identidad) FROM referencias.tipo_identidad


    SELECT row_to_json(edo_civil) FROM referencias.edo_civil

    SELECT row_to_json(pais) FROM referencias.pais

    SELECT row_to_json(estado) FROM referencias.estado

    SELECT row_to_json(ciudad) FROM referencias.ciudad'''

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.tipo_identidad_listar()
    print('###################################################################################')
    print('Lo que devuelve sql.tipo_identidad_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        #  msg = {"status": editar['status'], "mensaje": editar['mensaje']}
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/genero_sexo')
def GetGeneroSexo():
    '''Metodo que permite Buscar todos los registros de la tabla genero_sexo'''

    '''SELECT row_to_json(genero_sexo) FROM referencias.genero_sexo'''

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.genero_sexo_listar()
    print('###################################################################################')
    print('Lo que devuelve sql.genero_sexo_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/nacionalidad')
def GetNacionalidad():
    '''Metodo que permite Buscar todos los registros de la tabla Nacionalidad'''

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.nacionalidad_listar()
    print('###################################################################################')
    print('Lo que devuelve sql.nacionalidad_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/edocivil')
def GetEdoCivil():
    '''Metodo que permite Buscar todos los registros de la tabla Estado Civil'''

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.edo_civil_listar()
    print('###################################################################################')
    print('Lo que devuelve sql.edo_civil_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/pais')
def GetPais():
    '''Metodo que permite Buscar todos los registros de la tabla Pais'''

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.pais_listar()
    print('###################################################################################')
    print('Lo que devuelve sql.pais_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/estado')
def GetEstado():
    '''Metodo que permite Buscar todos los registros de la tabla Estado'''

    paisId = ''  # id_pais

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.estado_listar(paisId)
    print('###################################################################################')
    print('Lo que devuelve sql.estado_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.get('/estado/<id_pais>')
def GetEstadoId(id_pais):
    '''Metodo que permite Buscar todos los registros de la tabla Estado'''

    paisId = id_pais

    msg = {"status": 0, "mensaje": ''}

    # Consulta la Base de Datos
    editar = sql.estado_listar(paisId)
    print('###################################################################################')
    print('Lo que devuelve sql.estado_listar()', editar)
    print('###################################################################################')

    if editar['status']:
        msg = editar['mensaje']
        return json.dumps(msg)
    else:
        msg = editar
    return json.dumps(msg)


@bottle.post('/notificar')
def notificarFrontEnd():
    '''Metodo que recibe desde el FrontEnd y permite enviar una notificacion SMS al usuario '''

    recibidoParam = (bottle.request.json)
    id_usuario = recibidoParam['id']
    mensaje = recibidoParam['mensaje']

    movil = ''
    msg = {"status": 0, "mensaje": 'No se envio el Mensaje'}

    # Consulta la Base de Datos para buscar el movil
    buscar = sql.buscarTelefono(id_usuario)
    if buscar['status']:
        movil = buscar['mensaje'][0]['telefono_movil']  # buscar['mensaje'][0]['inf_personal_telefono_movil']
        print('el movil a enviar es:', movil)
        if movil:
            msg = notificar.sms(mensaje, movil)
            if msg['status']:
                print('Mensaje enviado con exito al numero:{0}'.format(movil))
            else:
                print('No fue posible emviar el mesaje al numero:{0}'.format(movil))
            # msg devuelve: {u'status': 1} si todo sale bien

    return json.dumps(msg)


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
    insReg = sql.crearRegRapido(nombre, apellido, correo, clave, fechanac, genero, movil)

    print('####################################################')
    print('Lo que develve el insert de /crearRegistroRapido', insReg)
    print('####################################################')

    return json.dumps(insReg)

# bottle.debug(True)
bottle.run(host='0.0.0.0', port=8086, server=GeventWebSocketServer, reloader=True)
