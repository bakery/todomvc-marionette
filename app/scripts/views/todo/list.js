define(["backbone","marionette", "vent", "views/todo/item", "handlebars","text!./list.html"],

    function(Backbone,Marionette,vent,TodoItemView,Handlebars,template){

        var TodoList = Marionette.CompositeView.extend({
            template : function(serializedModel){
                var t = Handlebars.compile(template);
                return t(serializedModel);
            },

            itemView: TodoItemView,
            itemViewContainer: "#todo-list",

            ui: {
                toggle: '#toggle-all'
            },

            events : {
                'click #toggle-all': 'onToggleAllClick'
            },

            initialize: function() {
                this.listenTo(this.collection, 'all', this.update, this);
            },

            onRender: function() {
                this.update();
            },

            update: function() {
                function reduceCompleted(left, right) {
                    return left && right.get('completed');
                }

                var allCompleted = this.collection.reduce(reduceCompleted,true);

                this.ui.toggle.prop('checked', allCompleted);
                this.$el.parent().toggle(!!this.collection.length);
            },

            onToggleAllClick: function(e) {
                var isChecked = e.currentTarget.checked;

                this.collection.each(function(todo){
                    todo.save({'completed': isChecked});
                });
            }
        }); 

        // Application Event Handlers
        // --------------------------
        //
        // Handler for filtering the list of items by showing and
        // hiding through the use of various CSS classes

        vent.on('todoList:filter', function(filter) {
            filter = filter || 'all';
            $('#todoapp').attr('class', 'filter-' + filter);
        });


        return TodoList;
    }
);