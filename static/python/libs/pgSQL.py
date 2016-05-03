# -*- coding: utf-8 -*-

import psycopg2
import os


class PG():

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
