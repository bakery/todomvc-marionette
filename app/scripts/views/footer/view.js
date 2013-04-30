define(["backbone","marionette","vent","text!./view.html"], 
    function(Backbone,Marionette,vent,template){
        var FooterView = Backbone.Marionette.ItemView.extend({
            template : template,

            ui : {
                filters: '#filters a'
            },

            events: {
                'click #clear-completed': 'onClearClick'
            },

            collectionEvents: {
                'all' : 'render'
            }, 

            initialize : function() {
                this.listenTo(vent, 'todoList:filter', this.updateFilterSelection, this);
            },

            serializeData : function(){
                return {
                    activeItems : this.collection.getActive().length,
                    completedItems : this.collection.getCompleted().length
                };
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