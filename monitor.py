#!/usr/bin/python
# -*- coding: utf-8 -*-
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

HCEventos = bottle.Bottle()

# ---------------------------------------
# Ejemplo CRUD
# ---------------------------------------
@bottle.route('/restapi/<id>')
def raget(id):
    print('Entro al GET',id)
    model = {'model': 'Modelo'}
    return  model

@bottle.post('/restapi')
def rapost():
    recibido = bottle.request.json
    print('Entro al POST',recibido)
    model = {'model': 'Modelo'}
    return  model

@bottle.put('/restapi/<id>')
def raPUT(id):
    print('Entro al PUT',id)
    model = {'model': 'Modelo'}
    return  model

@bottle.delete('/restapi/<id>')
def raDEL(id):
    print('Entro al DEL',id)
    model = {'model': 'Modelo'}
    return  model

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
def static(filename):
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

@bottle.route('/tplVentanaModal')
def modal():
    ''' '''
    return bottle.static_file("ventanaModal.html", root='js/templates/')

# ------------------------------------------------------------------------------
# Por ahira no va
# ------------------------------------------------------------------------------
@route('/cargarPlantilla/<pagename>')
def show_wiki_page(pagename):
    print(pagename)
    return bottle.static_file(pagename, root='js/templates/')

@bottle.route('/')
def index():
    #usuario = ''
    #bottle.response.set_cookie("account", usuario)
    username = bottle.request.get_cookie("account")

    #print('usuario',username)
    return bottle.static_file("index.html", root='')

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
    msg = {"status": 0, "mensaje": ''}

    recibido = bottle.request.json

    usuario = recibido['usuario']
    clave = recibido['clave']

    # Consulta la Base de Datos
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
    movil = ''

    # Consulta la Base de Datos
    editar = sql.editarUsuarios(recibidoId, recibidoClave)

    if editar['status']:
        # Consulta la Base de Datos para buscar el movil
        '''buscar = sql.buscarUsuario(recibidoId)

        if buscar['status']:
            # Si todo salio bien, obtengo el telefono movil
            movil = buscar['mensaje'][0]['inf_personal_telefono_movil']
            nombre_usuario = buscar['mensaje'][0]['nombre_usuario']
            cuerpoMensaje = '{0}: Su clave fue cambiada con exito'.format(nombre_usuario)
            if movil:
                #notificar.sms(cuerpoMensaje, movil)
                pass'''

        msg = {"status": editar['status'], "mensaje": "Contraseña cambiada con exito"}
        return json.dumps(msg)
    else:
        print('Algo no salio bien al intentar cambiar la clave del usuario')
        msg = editar
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
    insReg = sql.crearRegRapido(nombre, apellido, correo, clave, fechanac, genero)
    print(insReg)

    if insReg['status']:
        cuerpoMensaje = 'Saludos {0}, Registro exitoso en Eventos del Hospital Coromoto, su usuario es: {1} y su clave de acceso es: {2}'.format(nombre, correo, clave)
        # ' Lo invitamos a concluir su registro iniciando sesion y completando los datos faltantes'.format(nombre, apellido, correo, clave)
        remitenteMensaje = ''
        asuntoMensaje = 'Registro realizado con Exito'

        # Esto Ralentiza el front end
        # notificar.enviarEmail(correo, cuerpoMensaje, remitenteMensaje, asuntoMensaje)
        # notificar.sms(cuerpoMensaje, movil)
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

# bottle.debug(True)
bottle.run(host='0.0.0.0', port=8086, server=GeventWebSocketServer, reloader = True)
