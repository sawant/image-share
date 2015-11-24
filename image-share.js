Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Template.images.helpers({
    images:Images.find({}, {sort: {createdOn: -1, rating: -1}})
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
      Images.update({_id:image_id}, {$set: {rating: rating}});
    },
    'click .js-add-image-btn': function(event) {
      $("#image-add-form").modal('show');
    }
  });

  Template.image_add_form.events({
    'submit .js-image-add': function(event) {
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;

      Images.insert({
        img_src: img_src,
        img_alt: img_alt,
        createdOn: new Date()
      });

      $("#image-add-form").modal('hide');
      return false;
    }
  });
}

if (Meteor.isServer) {
  console.log("I am the server.");
}
