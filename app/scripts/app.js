define(["backbone", "marionette", "controllers/todo"], 

    function (Backbone, Marionette, TodoController) {

        // set up the app instance
        var MyApp = new Marionette.Application();

        TodoController.initialize(MyApp);

        MyApp.on('initialize:after', function() {
            Backbone.history.start();
        });

        MyApp.addRegions({
            main : ".content"
        });

        // export the app from this module
        return MyApp;
    }
);