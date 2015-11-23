Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Template.images.helpers({
    images:Images.find({}, {sort: {rating: -1}})
  });

  Template.images.events({
    'click .js-image': function(event) {
      $(event.target).css('transform', 'scale(1.5)');
    },
    'click .js-img-delete': function(event) {
      var image_id = this._id;
      $("#"+this._id).hide('slow', function() {
        Images.remove(image_id);
      });
    },
    'click .js-rate-image': function(event) {
      var image_id = this["data-id"];
      var rating = $(event.currentTarget).data("userrating");
      // console.log(rating + ", " + image_id);
      Images.update({_id:image_id}, {$set: {rating: rating}});
    }
  })
}

if (Meteor.isServer) {
  console.log("I am the server.");
}
