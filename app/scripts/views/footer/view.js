define(["backbone","marionette","vent","text!./view.html"], 
    function(Backbone,Marionette,vent,template){
        var FooterView = Backbone.Marionette.ItemView.extend({
            template : template,

            ui : {
                todoCount: '#todo-count .count',
                todoCountLabel: '#todo-count .label',
                clearCount: '#clear-completed .count',
                filters: '#filters a'
            },

            events: {
                'click #clear-completed': 'onClearClick'
            },

            collectionEvents: {
                'all' : 'updateCount'
            }, 

            initialize : function() {
                this.listenTo(vent, 'todoList:filter', this.updateFilterSelection, this);
            },

            onRender: function() {
                this.updateCount();
            },

            updateCount: function() {
                var activeCount = this.collection.getActive().length,
                completedCount = this.collection.getCompleted().length;
                this.ui.todoCount.html(activeCount);
                this.ui.todoCountLabel.html(activeCount === 1 ? 'item' : 'items');
                this.ui.clearCount.html(completedCount === 0 ? '' : '(' + completedCount + ')');
            },

            updateFilterSelection : function(filter) {
                this.ui.filters
                    .removeClass('selected')
                    .filter('[href="#' + filter + '"]')
                    .addClass('selected');
            },

            onClearClick: function() {
                var completed = this.collection.getCompleted();
                completed.forEach(function destroy(todo) {
                    todo.destroy();
                });
            }
        });

        return FooterView;
    }
);