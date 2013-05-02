define(["underscore", "marionette", "vent", "models/todo", "views/layouts/application.layout"],

    function(_,Marionette,vent,TodoData,ApplicationLayout){

        var AppRouter = Marionette.AppRouter.extend({
            appRoutes: {
                '*filter' : 'filterItems'
            }
        });

        var Controller = function(){
            this.todoList = new TodoData.Collection();
        };

        _.extend(Controller.prototype, {

            filterItems : function(filter){
                vent.trigger('todoList:filter', filter.trim() || '');
            },

            start : function(application){
                
                var applicationLayout = new ApplicationLayout();
                application.main.show(applicationLayout);

                applicationLayout.showHeader(this.todoList);
                applicationLayout.showFooter(this.todoList);
                applicationLayout.showMainArea(this.todoList);
            }

        });

        return {

            initialize : function(application){
                application.addInitializer(function(){
                    var controller = new Controller();
                    new AppRouter({ controller : controller});
                    controller.start(application); 
                });
            }

        };

    }
);