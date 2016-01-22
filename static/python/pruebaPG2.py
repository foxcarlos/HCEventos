import psycopg2
import sys


class pg():
    def __init__(self):
        ''' '''
        self.cur = ''
        self.conn = ''
        self.estadoConexion = {'status':0, 'mensaje':''}
        self.cad_conex = ''
    
    def conectar(self, string_conn=""):
        ''' parametros 1: string "Cadena de conexion"
        Metodo que permite conectar a postgresql
        '''
        self.cad_conex = string_conn
        
        try:
            self.conn = psycopg2.connect(string_conn)
            self.cur = conn.cursor()
            self.estadoConexion = {'status':1, 'mensaje':'Conexion Exitosa'}
        except psycopg2.Error as e:    
            self.estadoConexion = {'status':0, 'mensaje':e}
        
    def ejecutar(self, cadSelect):
        '''Metodo que permite hacer los Select o Insert a postgresql ''' 
        
        self.estadoComandoSql = {'status':0, 'mensaje':''}
        cadSelectSql = cadSelect
        
        if self.estadoConexion['status']:
            try:
                self.cur.execute(cadSelectSql)
                self.estadoComandoSql = {'status':1, 'mensaje':'Comando Ejecutado con Exito'}
                
            except psycopg2.Error as e:    
                self.estadoComandoSql = {'status':0, 'mensaje':e}

if __name__ == '__main__':
    posg = pg()
    cnx = "host='10.121.6.4' dbname='evento' user='admhc' password='shc21152115'"
    posg.cad_conex = cnx
    posg.conectar(cnx)
    print(posg.estadoConexion)
    if posg.estadoConexion["status"]:
        sql = "select id from usuario where usuario = '{0}'".format('foxcarlos@gmail.com')
        posg.ejecutar(sql)
        print(posg.estadoComandoSql)
        if posg.estadoComandoSql["status"]:
            registros = posg.cur.fetchall()
            if registros:
                idUsuario = registros[0][0]
                sqlSelectVista = "select *from vdatospersona where usuario = {0}".format(idUsuario)
                posg.ejecutar(sqlSelectVista)
                print(posg.estadoComandoSql)
                vista = posg.cur.fetchall()
                if vista:
                    cabecera = [col[0] for col in posg.cur.description]        
                    diccionario = dict(zip(cabecera, vista[0]))
                    print(diccionario)
                else:
                    print({'status':0, 'mensaje':'no se encontraron registros'})
                    