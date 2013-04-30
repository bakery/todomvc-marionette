define(["backbone","marionette","handlebars","text!./item.html"],

    function(Backbone,Marionette,Handlebars,template){

        var TodoItem = Marionette.ItemView.extend({
            tagName : 'li',
            template : function(serializedModel){
                var t = Handlebars.compile(template);
                return t(serializedModel);
            },

            ui: {
                edit: '.edit'
            },

            events : {
                'click .destroy': 'destroy',
                'dblclick label': 'onEditClick',
                'keypress .edit': 'onEditKeypress',
                'blur .edit': 'onEditBlur',
                'click .toggle' : 'toggle'
            },

            modelEvents : {
                'change' : 'render'
            },

            onRender: function() {
                this.$el.removeClass('active completed');

                if (this.model.get('completed')) {
                    this.$el.addClass('completed');
                } else {
                    this.$el.addClass('active');
                }
            },

            destroy: function() {
                this.model.destroy();
            },

            toggle: function() {
                this.model.toggle().save();
            },

            onEditClick: function() {
                this.$el.addClass('editing');
                this.ui.edit.focus();
            },

            updateTodo : function() {
                var todoText = this.ui.edit.val();
                if (todoText === '') {
                    return this.destroy();
                }
                this.setTodoText(todoText);
                this.completeEdit();
            },

            onEditBlur: function(e){
                this.updateTodo();
            },

            onEditKeypress: function(e) {
                var ENTER_KEY = 13;
                if (e.which === ENTER_KEY) {
                    this.updateTodo();
                }
            },

            setTodoText: function(todoText){
                if (todoText.trim() === ""){ return; }
                this.model.set('title', todoText).save();
            },

            completeEdit: function(){
                this.$el.removeClass('editing');
            }

        });

        return TodoItem;

    }
);