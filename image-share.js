Images = new Mongo.Collection("images");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  });

  Template.body.helpers({
    username: function() {
      if (Meteor.user()) {
        return Meteor.user().username;
      }
      else {
        return "anonymous";
      }
    }
  });

  Template.images.helpers({
    images: function() {
      if (Session.get("filterByUser")) {
        return Images.find({createdBy: Session.get("filterByUser")}, {sort: {createdOn: -1, rating: -1}});
      }
      else {
        return Images.find({}, {sort: {createdOn: -1, rating: -1}});
      }
    },
    getUser: function(user_id) {
      var user = Meteor.users.findOne({_id:user_id});

      if (user) {
        return user.username;
      }
      else {
        return "anonymous";
      }
    },
    isFilterSet: function() {
      if (Session.get("filterByUser")) {
        return true;
      }

      return false;
    },
    getFilterUser: function() {
      if (Session.get("filterByUser")) {
        var user = Meteor.users.findOne({_id:Session.get("filterByUser")});

        if (user) {
          return user.username;
        }
        else {
          return "anonymous";
        }
      }

      return false;
    }
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
    },
    'click .js-filter-user': function(event) {
      Session.set({"filterByUser": this.createdBy});
    },
    'click .js-reset-filters': function(event) {
      Session.set({"filterByUser": ""});
    }
  });

  Template.image_add_form.events({
    'submit .js-image-add': function(event) {
      var img_src = event.target.img_src.value;
      var img_alt = event.target.img_alt.value;

      if (Meteor.user()) {
        Images.insert({
          img_src: img_src,
          img_alt: img_alt,
          createdOn: new Date(),
          createdBy: Meteor.user()._id
        });
      }

      $("#image-add-form").modal('hide');
      return false;
    }
  });
}

if (Meteor.isServer) {
  console.log("I am the server.");
}
