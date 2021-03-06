console.log("Starting up...");

Meteor.startup(function() {
    if (Images.find().count() == 0) {
        for (var i = 1; i < 13; i++) {
            Images.insert(
            {
              img_src: "images/dog_" + i + ".jpg",
              img_alt: "Dog number " + i
            }
            );
        } // end for loop for populating dogs

        // output number of images in database
        console.log(Images.find().count());
    } // end if that checks if there are no images

    if (Meteor.users.find().count() === 0) {
        Accounts.createUser({
            username: 'admin',
            email: 'admin@test.com',
            password: 'ReplacePassword937'
        })
    }
});
