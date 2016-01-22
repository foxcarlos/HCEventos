import psycopg2
import sys

registros=""

try:
    conn = psycopg2.connect("host='10.121.6.4' dbname='evento' user='admhc' password='shc21152115'")
    cur = conn.cursor()
    
    sql = "select id from usuario where usuario = '{0}'".format('foxcarlos@gmail.com')
    cur.execute(sql)
    registros = cur.fetchall()
except psycopg2.Error as e:    
#except psycopg2.DatabaseError, e:
    devuelveMsg = {'status':0, 'mensaje':e}
    print(devuelveMsg)



print(registros )

if registros:
    print('entro')
    sqlSelectVista = "select *from vdatospersona where usuario = {0}".format(registros[0][0])
    #sqlSelectVista = "select *from referencias.cargo "
    cur.execute(sqlSelectVista)    
    cabecera = [col[0] for col in cur.description]
    print(cabecera)
    vista = cur.fetchall()[0]
    diccionario = dict(zip(cabecera, vista))
    print(diccionario)

    cur.close        
    conn.close
