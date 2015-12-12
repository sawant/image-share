Images = new Mongo.Collection("images");

Images.allow({
    insert: function (userId, doc) {
        if (Meteor.user()) { // if user logged in
            if (userId !== doc.createdBy) { // Logged in user is trying to mess around by posting with another id
                return false;
            }
            else { // Logged in user is fine
                return true;
            }
        }
        else { // Not logged in
            return false;
        }
    },

    remove: function (userId, doc) {
        if (Meteor.user()) { // if user logged in
            if (Meteor.user().username === 'admin') { // Super User
                return true;
            }
            else if (userId === doc.createdBy) { // Only user that created this is allowed to delete this
                return true;
            }
            else { // Logged in user is not authorized
                return false;
            }
        }
        else { // Not logged in
            return false;
        }
    }
});