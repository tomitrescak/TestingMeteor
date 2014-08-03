// file: tests/tutorial-jasmine-unit.js
(function () {
    "use strict";
    describe("Tutorial", function () {
            // mock
            Meteor.user = function() { return {} };

            it("should be created by admins with name and capacity and initial capacity", function () {
            spyOn(Tutorials, "insert").andReturn(1);
            spyOn(Roles, "userIsInRole").andReturn(true);

            Meteor.methodMap.createTutorial("Tutorial 1", 20);

            expect(Tutorials.insert).toHaveBeenCalledWith({name: "Tutorial 1", capacity: 20, currentCapacity: 0});
            expect(Roles.userIsInRole).toHaveBeenCalledWith({}, "admin");
        });

        it("should not be created by non-admins", function () {
            spyOn(Roles, "userIsInRole").andReturn(false);
            spyOn(Tutorials, "insert");

            expect(Meteor.methodMap.createTutorial).toThrow();
            expect(Tutorials.insert).not.toHaveBeenCalled();
        });

        it("should be able to update its name and capacity by admins", function () {
            spyOn(Roles, "userIsInRole").andReturn(true);
            spyOn(Tutorials, "update");

            Meteor.methodMap.updateTutorial(1, "Tutorial 1", 20);

            expect(Tutorials.update).toHaveBeenCalledWith(1, {$set: { name: "Tutorial 1", capacity: 20 }});
            expect(Roles.userIsInRole).toHaveBeenCalledWith({}, "admin");
        });

        it("should not be updated by non-admins", function () {
            spyOn(Roles, "userIsInRole").andReturn(false);
            spyOn(Tutorials, "update");

            expect(Meteor.methodMap.createTutorial).toThrow();
            expect(Tutorials.update).not.toHaveBeenCalled();
            expect(Roles.userIsInRole).toHaveBeenCalledWith({}, "admin");
        });

        it("should be possible to delete tutorial by admins", function () {
            spyOn(Roles, "userIsInRole").andReturn(true);
            spyOn(Tutorials, "remove");

            Meteor.methodMap.removeTutorial("1");

            expect(Tutorials.remove).toHaveBeenCalledWith("1");
            expect(Roles.userIsInRole).toHaveBeenCalledWith({}, "admin");
        });

        it("should not be possible to delete tutorial by non-admins", function () {
            spyOn(Roles, "userIsInRole").andReturn(false);
            spyOn(Tutorials, "remove");

            expect(Meteor.methodMap.removeTutorial).toThrow();
            expect(Tutorials.remove).not.toHaveBeenCalled();
        });

        it("should not be possible to delete tutorial with active subscriptions", function () {
            spyOn(Roles, "userIsInRole").andReturn(true);
            spyOn(Tutorials, "remove");
            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 2 }});

            try
            {
                Meteor.methodMap.removeTutorial("1");
            }
            catch (ex) {
                expect(ex).toBeDefined();
            }

            expect(Meteor.methodMap.removeTutorial).toThrow();
            expect(TutorialRegistrations.find).toHaveBeenCalledWith({tutorialId: "1"});
            expect(Tutorials.remove).not.toHaveBeenCalled();
        });

        it("should not be possible to register while at maximum capacity", function() {
            spyOn(Tutorials, "find").andReturn({capacity: 1, currentCapacity: 1});
            expect(Meteor.methodMap.registerForTutorial).toThrow();
        });

        it("should not be possible to register if registration is present", function() {
            spyOn(Tutorials, "find").andReturn({capacity: 2, currentCapacity: 1});
            spyOn(TutorialRegistrations, "findOne").andReturn({});

            expect(Meteor.methodMap.registerForTutorial).toThrow();
        });

        it("should be possible to register if within capacity and first registration", function() {
            spyOn(Meteor, "userId").andReturn("2");
            spyOn(Tutorials, "findOne").andReturn({capacity: 2, currentCapacity: 1});
            spyOn(TutorialRegistrations, "findOne").andReturn(null);
            spyOn(TutorialRegistrations, "insert");
            spyOn(Tutorials, "update");

            Meteor.methodMap.registerForTutorial("1");

            expect(TutorialRegistrations.insert).toHaveBeenCalledWith({tutorialId: "1", userId: "2"});
            expect(Tutorials.update).toHaveBeenCalledWith("1", {$set: { currentCapacity: 2}});

        });

        it("should not be possible to de-register if registration not present", function() {
            spyOn(TutorialRegistrations, "findOne").andReturn();
            expect(Meteor.methodMap.removeRegistration).toThrow();
        });

        it("should be possible to de-register if registration exists", function() {
            spyOn(Meteor, "userId").andReturn("2");
            spyOn(TutorialRegistrations, "findOne").andReturn({});
            spyOn(TutorialRegistrations, "remove");
            spyOn(Tutorials, "findOne").andReturn({capacity: 2, currentCapacity: 1});
            spyOn(Tutorials, "update");

            Meteor.methodMap.removeRegistration("1");

            expect(TutorialRegistrations.remove).toHaveBeenCalledWith({tutorialId: "1", userId: "2"});
            expect(Tutorials.update).toHaveBeenCalledWith("1", {$set: { currentCapacity: 0}});
        });
    });
})();

