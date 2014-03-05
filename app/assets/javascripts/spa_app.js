window.SpaApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  // initialize: function() {
  //   $.get("/todos.json").done(function (data) {
  //     var view = new SpaApp.Views.TodosIndex({ collection: data });
  //     $('#container').html(view.render().el);
  //   });
  // },

  start: function(){
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});
    this.makeNav();
  },

  makeNav: function(){
    var view = new this.Views.Nav();
    $('#header').html(view.render().$el);
  }

};

SpaApp.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "main",
    "other": "other",
    "detail/:id": "detailRoute",
    "*actions": "defaultRoute"
  },

  main: function(){
    $.get("/todos.json").done(function (data){
    var view = new SpaApp.Views.TodosIndex({collection: data});
    $('#container').html(view.render().$el);
  });
  },

  other: function() {
    // some function
    var view = new SpaApp.Views.Other();
    $('#container').html(view.render().$el);
  },

  defaultRoute: function(){
    $('#container').text("Default");
  },

  detailRoute: function(id){
    $.get("/todos/"+id).done(function(data){
      // console.log(data);
    var view = new SpaApp.Views.TodoDetail({model: data});
    $('#container').html(view.render().$el);
  });
  }

});

SpaApp.Views.TodoDetail = Backbone.View.extend({

  template: HandlebarsTemplates['todos/detail'],

  render: function(){
    console.log(this.model);
    this.$el.html(this.template(this.model));
    // this.$el.append("<div>something</div>");
    return this;
  }

});

SpaApp.Views.Other = Backbone.View.extend({
  tagname: "other",
  render: function(){
    var text = "Other Route";
    this.$el.text(text);
    return this;
  }
});

SpaApp.Views.Nav = Backbone.View.extend({
  tagname: "div",
  events: {
    "click a": "linkClicked"
  },
  render: function(){
    this.$el.html('<a href="/">Index</a> <a href="/other">Other</a>');
    return this;
  },
  linkClicked: function(event){
    event.preventDefault();
    // console.log(event.target.pathname);
    var path = event.target.pathname;
    SpaApp.router.navigate(path, {trigger: true});
    // add more stuff here
  }

});



$(document).ready(function(){
  // SpaApp.initialize();
  SpaApp.start();
});
