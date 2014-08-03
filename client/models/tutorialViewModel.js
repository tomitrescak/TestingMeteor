//file: client/models/tutorialViewModel.js
TutorialViewModel = {
    _id: null,
    name: null,
    capacity: 0,
    currentCapacity: 0,
    init: function(id, name, capacity, currentCapacity) {
        this._id = id;
        this.name = name;
        this.capacity = capacity;
        this.currentCapacity = currentCapacity;
        return this;
    },
    create: function(id, name, capacity, currentCapacity) {
        return Object.create(TutorialViewModel).init(id, name, capacity, currentCapacity);
    },
    save: function() {
        if (!this.name) {
            throw "Name empty or not defined!";
        }
        if (!this.capacity) {
            throw "Capacity 0 or not defined";
        }

        var that = this;

        if (this._id) {
            Meteor.call("updateTutorial", this._id, this.name, this.capacity, function(err) {
                if (err) {
                    alert(err);
                }
            });
        } else {
            Meteor.call("createTutorial", this.name, this.capacity, function(err, id) {
                if (err) {
                    alert(err);
                } else {
                    that._id = id;
                }
            });
        }
    },
    delete: function() {
        if (!this._id) return;

        Meteor.call("removeTutorial", this._id, function(err) {
            if (err) {
                alert(err);
            }
        });
    },
//    registerStudent: function() {
//        if (TutorialRegistrations.find({tutorialId: this._id}).count() >= this.currentCapacity) {
//            throw "Capacity of the tutorial has been reached!";
//        }
//        TutorialRegistrations.insert({tutorialId: this._id, studentId: Meteor.userId()}, function (err, id) {
//            if (!err) {
//                this.currentCapacity += 1;
//            }
//        });
//    }
    registerStudent: function() {
        Meteor.call("registerForTutorial", this._id, function(err) {
            if (err) {
                alert(err);
            }
        });
    },
    removeRegistration: function() {
        Meteor.call("removeRegistration", this._id, function(err) {
            if (err) {
                alert(err);
            }
        });
    }
};