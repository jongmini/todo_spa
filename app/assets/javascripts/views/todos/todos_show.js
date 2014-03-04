SpaApp.Views.TodosShow = Backbone.View.extend({
  
  className: function() {
    if (this.model.completed) {
      return 'done done-true';
    } else {
      return 'done';
    }
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
    // console.log(this.model);
    var deleteTodo = this.model.id;

    $.ajax({
        type: 'delete',
        context: this,
        url: '/todos/' + deleteTodo
      })
        .done(function () {
          console.log(this);
          $(this.el).remove();
        });

    return this;
  },

  updateTodo: function(event){
    // console.log("checked");
    var completeTodo = this.model;
    // completeTodo.completed = (input[type="checkbox"]).checked;
    this.model.completed = !this.model.completed;

    console.log(completeTodo);

    $.ajax({
        type: 'patch',
        context: this,
        url: '/todos/' + completeTodo.id,
        data: {
          todo: completeTodo
        }
      }).done(function (data) {
        // console.log('databse updated');
        $(this.el).toggleClass("done-true");
      });

  }


});