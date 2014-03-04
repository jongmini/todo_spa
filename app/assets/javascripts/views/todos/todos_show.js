SpaApp.Views.TodosShow = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/show'],

  events: {
    "click #removeTodo" : "removeTodo"

  },


  removeTodo: function(event){
    
    // console.log(this);
    // console.log($(event.target).parent());
    // $(event.target).parent().remove();

    return this;
  }


});