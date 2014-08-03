//file: server/tutorials.js
Meteor.methods({
    createTutorial: function(name, capacity) {
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), "admin")) {
            throw new Meteor.Error(403, "Access Denied");
        }
        Tutorials.insert({name: name, capacity: capacity, currentCapacity: 0});
    },
    updateTutorial: function(id, name, capacity) {
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), "admin")) {
            throw new Meteor.Error(403, "Access Denied");
        }
        Tutorials.update(id, {$set: {name: name, capacity: capacity}});
    },
    removeTutorial: function(id) {
        if (!Meteor.user() || !Roles.userIsInRole(Meteor.user(), "admin")) {
            throw new Meteor.Error(403, "Access Denied");
        }

        if (TutorialRegistrations.find({tutorialId: id}).count() > 0) {
            throw new Meteor.Error(406, "Tutorial has subscriptions");
        }
        Tutorials.remove(id);
    },
    registerForTutorial: function(tutorialId) {
        var userId = Meteor.userId();
        var tutorial= Tutorials.findOne(tutorialId);
        var tutorialRegistration = TutorialRegistrations.findOne({tutorialId: tutorialId, userId: userId});

        if (tutorial.currentCapacity >= tutorial.capacity) {
            throw new Meteor.Error(406, "Tutorial at full capacity");
        }

        if (tutorialRegistration != null) {
            throw new Meteor.Error(406, "Student already registered");
        }

        Tutorials.update(tutorialId, { $set: { currentCapacity: tutorial.currentCapacity + 1}});
        TutorialRegistrations.insert({tutorialId: tutorialId, userId: userId});
    },
    removeRegistration: function(tutorialId) {
        var userId = Meteor.userId();
        var tutorial= Tutorials.findOne(tutorialId);
        var tutorialRegistration = TutorialRegistrations.findOne({tutorialId: tutorialId, userId: userId});

        if (tutorialRegistration == null) {
            throw new Meteor.Error(406, "Student not registered for this tutorial");
        }

        TutorialRegistrations.remove({tutorialId: tutorialId, userId: userId});
        Tutorials.update(tutorialId, { $set: { currentCapacity: tutorial.currentCapacity - 1 }});
    }
});