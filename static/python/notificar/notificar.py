import smtplib
from email.mime.text import MIMEText
import requests
import json

def sms(mensaje='', numero=''):
    ''' Metodo para el envio de SMS'''

    datos = {'numero': numero, 'mensaje': mensaje}
    url = 'http://foxcarlos.no-ip.biz/externo'
    cabecera = {'content-type': 'application/json'}

    sms = requests.post(url, data=json.dumps(datos), headers=cabecera)
    #return sms

    #requests.post("http://10.121.0.110:9091/mensaje", data = {'var1':mensaje, 'var2':numero})

def enviarEmail(destinatario, mensaje, remitente='pycondor@gmail.com', \
asunto='Sin Asunto '):
    '''
    El metodo enviar email recibe 3 parametros:
    Destinatario:uncorreo@gmail.com
    Mensaje:'Esto es una prueba de envio'
    Remitente:Si no se envia ningun remitente el toma por defecto pycondor@gma
    Asunto:si no se coloca ninguno el toma por defecto el pasado en el parametr
    '''

    # Creamos el mensaje
    msg = MIMEText(mensaje.strip())

    # Conexin con el server

    msg['Subject'] = asunto
    msg['From'] = remitente
    msg['To'] = destinatario

    # Autenticamos
    mailServer = smtplib.SMTP('smtp.gmail.com', 587)
    mailServer.ehlo()
    mailServer.starttls()
    mailServer.ehlo()
    mailServer.login("pycondor@gmail.com", "shc21152115")

    # Enviamos
    mailServer.sendmail(remitente, destinatario, \
    msg.as_string())

    # Cerramos conexion
    mailServer.close()
