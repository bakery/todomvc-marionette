define(["backbone","backbone.localstorage"],function(Backbone){

    var localStorageKey = 'todos-backbone-marionettejs';

    Todo = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage(localStorageKey),

        defaults: {
            title: '',
            completed: false,
            created: 0
        },

        initialize: function() {
            if (this.isNew()) {
                this.set('created', Date.now());
            }
        },

        toggle: function() {
            return this.set('completed', !this.isCompleted());
        },

        isCompleted: function() {
            return this.get('completed');
        }
    });

    TodoList = Backbone.Collection.extend({
        model: Todo,

        localStorage: new Backbone.LocalStorage(localStorageKey),

        getCompleted: function() {
            return this.filter(this._isCompleted);
        },

        getActive: function() {
            return this.reject(this._isCompleted);
        },

        comparator: function(todo) {
            return todo.get('created');
        },

        _isCompleted: function(todo){
            return todo.isCompleted();
        }
    });

    return {
        Model : Todo,
        Collection : TodoList
    };

});