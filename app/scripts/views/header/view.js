define(["backbone","marionette","text!./view.html"], 
    function(Backbone,Marionette,template){
        var HeaderView = Backbone.Marionette.ItemView.extend({
            template : template,

            ui : {
                input : "#new-todo"              
            },

            events : {
                "keypress #new-todo" : "onInputKeypress",
                "blur #new-todo" : "onTodoBlur"
            },

            onTodoBlur : function(){
                var todoText = this.ui.input.val().trim();
                this.createTodo(todoText);                
            },

            onInputKeypress : function(e){
                var ENTER_KEY = 13;
                var todoText = this.ui.input.val().trim();
                if ( e.which === ENTER_KEY && todoText ) {
                    this.createTodo(todoText);
                }
            },

            completeAdd: function(){
                this.ui.input.val('');
            },

            createTodo: function(todoText){
                if (todoText.trim() === ""){ return; }

                this.collection.create({
                    title: todoText
                });

                this.completeAdd();
            }

        });

        return HeaderView;
    }
);