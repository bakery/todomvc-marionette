define(["backbone","marionette","views/header/view", "views/footer/view", "views/todo/list","text!./application.layout.html"],

    function(Backbone,Marionette,HeaderView,FooterView,TodoListView,template){

        var ApplicationLayout = Backbone.Marionette.Layout.extend({
            template : template,
            tagName : "section",
            id : "todoapp",
            regions : {
                header : "#header",
                main : "#main",
                footer : "#footer"
            },

            showHeader : function(todoList){
                var headerView = new HeaderView({ collection : todoList });
                this.header.show(headerView);     
                return this;
            },

            showMainArea : function(todoList){
                var todoListView = new TodoListView({ collection : todoList });
                this.main.show(todoListView);
                return this;
            },

            showFooter : function(todoList){
                var footerView = new FooterView({ collection : todoList });
                this.footer.show(footerView);
                return this;
            }
                
        });


        return ApplicationLayout;
    }
);