define(["underscore", "marionette", "vent", "models/todo", "views/header/view", "views/footer/view", "views/todo/list"],

    function(_,Marionette,vent,TodoData,HeaderView,FooterView,TodoListView){

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
                var headerView = new HeaderView({ collection : this.todoList });
                application.header.show(headerView);     

                var footerView = new FooterView({ collection : this.todoList });
                application.footer.show(footerView);

                var todoListView = new TodoListView({ collection : this.todoList });
                application.main.show(todoListView);
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