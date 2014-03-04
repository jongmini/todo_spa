SpaApp.Views.TodosShow = Backbone.View.extend({
  
  className: function() {
    return this.model.completed ? 'done-true' : '';
  },

  template: HandlebarsTemplates['todos/show'],

  events: {
    "click #removeTodo"               :"removeTodo",
    'click input[type="checkbox"]'    :"updateTodo"
  },

  render: function(){
    $(this.el).html(this.template(this.model));
    return this;
  },

  removeTodo: function(event){
    var deleteTodo = this.model.id;

    $.ajax({
            type: 'delete',
            context: this,
            url: '/todos/' + deleteTodo
          })
    .done(function () {
      $(this.el).remove();
    });

    return this;
  },

  updateTodo: function(event){
    var completeTodo = this.model;
    this.model.completed = !this.model.completed;

    $.ajax({
            type: 'patch',
            context: this,
            url: '/todos/' + completeTodo.id,
            data: { todo: completeTodo }
            })
    .done(function (data) {
      $(this.el).toggleClass("done-true");
    });
    return this;
  }


});