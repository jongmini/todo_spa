SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    'click #add':                'add'
  },

  render: function() {
    $(this.el).html(this.template());

    var todoView;
    _.each(this.collection, function (someTodo) {
      todoView = new SpaApp.Views.TodosShow({ model: someTodo} );
      this.$el.append(todoView.render().el);
    }, this);

    return this;
  },

  add: function(event) {
    event.preventDefault();
    
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false,
      description: $("#todo_desc").val()
    };
    // console.log(newTodo);
    $.ajax({
      type: "POST",
      url: '/todos.json',
      context: this,
      data: {todo: newTodo}
    }).done(function (todo) {
      // console.log(todo);
      var todoView = new SpaApp.Views.TodosShow({ model: todo });
      this.$el.append(todoView.render().el);
      $("#todo_title").val("");
      $("#todo_desc").val("");
    });
  }
});
