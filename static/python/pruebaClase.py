class objDevolver:
    ''' '''
    def __init__(self, status=0, msgStatus='', otro=''):
        self.st = status
        self.ms = msgStatus
        self.o = otro
        #self.retorna = {'devuelve':[{'status':self.st, 'mensajeStatus':self.ms}, {'valores':self.o}]}
        self.retorna = {'estado':self.st, 'mensaje':self.ms, 'valores':self.o}
        
        


if __name__ == '__main__':
    prueba = objDevolver(1, 'Todo Bien', {'nombre':'carlos', 'apellido':'garcia'})
    print(prueba.st)
    x = prueba.retorna
    print(x)
    
    
    