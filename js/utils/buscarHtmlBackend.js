Utils = {
    BuscarHtml: function(urlPasada){
        // Si no hay sesion de usuario
        self = this;
        $.ajax({
            async: false,
            url: urlPasada,
            type: 'GET',
            datatype: 'text',
            success: function(response){
                self.htmlDevuelto = response;
            },

            error: function(respuesta){
                self.htmlDevuelto = respuesta;
            }
        });
        return self.htmlDevuelto;
    }
};
