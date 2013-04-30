define(["backbone","marionette","handlebars"],function(Backbone,Marionette,Handlebars){

    Backbone.Marionette.Renderer.render = function(template,data){
        return Handlebars.compile(template)(data);
    };

});