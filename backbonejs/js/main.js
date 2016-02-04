
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var VehicleModel = Backbone.Model.extend({
  urlRoot: '/api/vehicles',
  validate: function(attr) {
    if (!attr.registrationNumber || attr.registrationNumber === null) {
      return 'Registration number is required.';
    }
  },
  start: function() {
    return 'Vehicle started.';
  }
});

var CarModel = VehicleModel.extend({
  start: function() {
    return 'Car with registration number ' +
            this.get('registrationNumber') +
            ' started.';
  }
});

var CarView = Backbone.View.extend({
  tagName: 'li',
  attributes: {
    'data-color': 'Blue'
  },
  events: {
    'click .delete': 'onClickDelete'
  },
  onClickDelete: function() {
    console.log('delete');
  },
  render: function() {
    this.$el.html(
      this.model.get('registrationNumber') +
      '<button class="delete">Delete</button>'
    );
    return this;
  }
});

var CarCollection = Backbone.Collection.extend({
  model: CarModel
});

var CarsView = Backbone.View.extend({
  tagName: 'ul',
  render: function() {
    var self = this;

    this.model.each(function(car) {
      console.log(car);
      var carView = new CarView({model: car});
      self.$el.append(carView.render().$el);
    });
  }
});

var cars = new CarCollection([
  new CarModel({registrationNumber: 'XLI887', color: 'Blue'}),
  new CarModel({registrationNumber: 'ZNP123', color: 'Blue'}),
  new CarModel({registrationNumber: 'XUV456', color: 'Gray'})
]);

var carsView = new CarsView({el: 'ul#cars', model: cars});
carsView.render();
