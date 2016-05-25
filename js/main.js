(function() {
    window.App = {
        Models: {},
        Collections: {},
        Views: {},
        Plantilla: function(idPasado){
            console.log(idPasado);
            return _.template( $('#'+idPasado).html() );
        },
    };

    // Coleccion para los datos de los usuarios
    App.Collections.DatosUsuarios = Backbone.Collection.extend({
        model: Models.DatosUsuario,
    });


// Modelo para el Menu
App.Collections.Menu = Backbone.Collection.extend({
    url: '/menu/1'
    /*
        Esta Coleccion se instancia:
         menu = new App.Collections.Menu();
        menu.fetch()
        luego se recorre con:
        for(var i=0;i<menu.length;i=i+1){
        console.log(menu.at(i).attributes)
        }

        menu.forEach(function(modelo, index, arreglo){
        console.log(modelo.get('nombre'))
        })

        var Coleccion = Backbone.Collection.extend({
        url: '/menu/1'
});

miColeccion.forEach(function(modelo, index, arreglo){
    if(modelo.get("depende_menu_id")==0){
        console.log(modelo.get("nombre"));
        $("#ulMenu").append('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">'+ modelo.get("nombre") +'<span class="caret"></span><a><ul '+'id="ul'+modelo.get("id")+'"'+' class="dropdown-menu" role="menu"></ul></li>')
    }
})
•
    */
});


// Vista para el Index:
App.Views.Index = Backbone.View.extend({

    el:$('body'),

    miPlantilla: App.Plantilla('index'),

    initialize: function(){
        this.render();
    },

    events: {
        'click #menu-toggle': 'mostrarMenu',
    },

    mostrarMenu: function(e){
        e.preventDefault();
        // this.$('#wrapper').toggleClass('toggled');

    },

    render: function(){
        this.$el.html(this.miPlantilla(this.model.toJSON()));

        miSelector = '#divCabeceraIndex';
        var miVistaCabeceraIndex = new Vista.CabeceraIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaCabeceraIndex.render().el);

        miSelector = '#divCuerpoIndex';
        var miVistaCuerpoIndex = new Vista.CuerpoIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaCuerpoIndex.render().el);

        miSelector = '#divPiePaginaIndex';
        var miVistaPiePaginaIndex = new Vista.PiePaginaIndex({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaPiePaginaIndex.render().el);

        miSelector = '#ulMenu';
        var miVistaCabeceraMenu = new Vista.MenuPrincipal({el: miSelector, model: this.model});
        var renderizar = miVistaCabeceraMenu.render().el;
        this.$(miSelector).append(miVistaCabeceraMenu.render().el);

        miSelector = '#divInicioSesion';
        var miVistaLogin = new Vista.Login({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaLogin.render().el);

        miSelector = '#divCuerpoIndexParte1';
        var miVistaCuerpoIndexParte1 = new Vista.CuerpoIndexParte1( {el: miSelector, model: this.model} );
        this.$(miSelector).append(miVistaCuerpoIndexParte1.render().el);

        miSelector = '#divCuerpoIndexParte2';
        var miVistaCuerpoIndexParte2 = new Vista.CuerpoIndexParte2({el: miSelector, model: this.model});
        this.$(miSelector).append(miVistaCuerpoIndexParte2.render().el);
    }
});

var indexModelo = new Models.Index();
var indexView = new App.Views.Index({model: indexModelo});

})();
