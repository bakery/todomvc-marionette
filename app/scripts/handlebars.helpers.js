define(["handlebars"], function(Handlebars){
    Handlebars.registerHelper('pluralize', function(val, options) {
        console.log("pluralize", options);
        return val === 1 ? options.hash.single: options.hash.plural;
    });
});