SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    "submit #addTodo"  : "add",

  },

  render: function() {
    $(this.el).html(this.template());

    _.each(this.collection, function (someTodo) {
      var todoHTML = HandlebarsTemplates['todos/show'](someTodo);
      this.$el.append(todoHTML); //(todoView.redner().el);
    }, this);

    return this;
  },

  add: function(event) {
    event.preventDefault();
    
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };

     $.ajax({type: "Post",
      url: '/todos.json', 
      context: this,
      data: {
      todo: newTodo
    }
  })
      .done(function(data) {
        var todoHTML = HandlebarsTemplates['todos/show'](data);
        $("#todos").append(todoHTML);
      });
    return this;
  }


});