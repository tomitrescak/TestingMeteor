// file: tests/tutorialViewModel-jasmine-unit.js
(function () {
    "use strict";
    describe("TutorialViewModel", function () {
        // create spy for alert
        Object.prototype.alert = function() {};

        it("should have id, name and capacity", function() {
            var model = TutorialViewModel.create("1", "Name", 10);
            expect(model._id).toEqual("1");
            expect(model.name).toEqual("Name");
            expect(model.capacity).toEqual(10);
        });

        it("should not save when name is not defined", function() {
            var model = TutorialViewModel.create(null, "", 10);
            expect(model.save).toThrow();
        });

        it("should not save when capacity is not defined", function() {
            var model = TutorialViewModel.create(null, "Name", 0);
            expect(model.save).toThrow();
        });

        it("should save when initialised properly", function() {
            var model = TutorialViewModel.create(null, "Name", 10);

            // create spy for alert
            spyOn(Object.prototype, "alert");
            spyOn(Meteor, "call").andCallFake(function (functionName, name, capacity, callback) {

                callback("Error", null);
                expect(alert).toHaveBeenCalled();

                callback(null, "1");
                expect(model._id).toEqual("1");
            });


            model.save();

            expect(Meteor.call).toHaveBeenCalled();
            expect(Meteor.call.mostRecentCall.args[0]).toEqual("createTutorial");
            expect(Meteor.call.mostRecentCall.args[1]).toEqual("Name");
            expect(Meteor.call.mostRecentCall.args[2]).toEqual(10);
        });

        it("should save updated changes", function() {
            var model = TutorialViewModel.create("1", "Name", 10);

            spyOn(Object.prototype, "alert");
            spyOn(Meteor, "call").andCallFake(function (functionName, id, name, capacity, callback) {
                callback("Error", null);
                expect(alert).toHaveBeenCalled();
            });

            model.save();

            expect(Meteor.call).toHaveBeenCalled();
            expect(Meteor.call.mostRecentCall.args[0]).toEqual("updateTutorial");
            expect(Meteor.call.mostRecentCall.args[1]).toEqual("1");
            expect(Meteor.call.mostRecentCall.args[2]).toEqual("Name");
            expect(Meteor.call.mostRecentCall.args[3]).toEqual(10);
        });

        it("should delete the existing tutorial", function() {
            var model = TutorialViewModel.create("1", "Name", 10);
            spyOn(Object.prototype, "alert");
            spyOn(Meteor, "call").andCallFake(function (functionName, id, callback) {
                callback("Error", null);
                expect(alert).toHaveBeenCalled();
            });

            model.delete();

            expect(Meteor.call).toHaveBeenCalled();
            expect(Meteor.call.mostRecentCall.args[0]).toEqual("removeTutorial");
            expect(Meteor.call.mostRecentCall.args[1]).toEqual("1");
        });

        it("should not delete a new tutorial", function() {
            var model = TutorialViewModel.create(null, "Name", 10);
            spyOn(Meteor, "call");

            model.delete();

            expect(Meteor.call).not.toHaveBeenCalled();
        });

        //        it("should allow students to register for the tutorial", function() {
        //            var model = TutorialViewModel.create("1", "Name", 10);
        //            var studentId = "2";
        //
        //            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 8; }});
        //            spyOn(TutorialRegistrations, "insert");
        //
        //            model.registerStudent(studentId);
        //
        //            expect(TutorialRegistrations.insert).toHaveBeenCalled();
        //            expect(TutorialRegistrations.insert.mostRecentCall.args[0]).toEqual({ tutorialId : '1', studentId : '2' });
        //        });

        it("should register student for the tutorial", function() {
            var model = TutorialViewModel.create("1", "Name", 10);
            spyOn(Object.prototype, "alert");
            spyOn(Meteor, "call").andCallFake(function (functionName, id, callback) {
                callback("Error", null);
                expect(alert).toHaveBeenCalled();
            });

            model.registerStudent();

            expect(Meteor.call).toHaveBeenCalled();
            expect(Meteor.call.mostRecentCall.args[0]).toEqual("registerForTutorial");
            expect(Meteor.call.mostRecentCall.args[1]).toEqual("1");
        });

        it("should de-register student from the tutorial", function() {
            var model = TutorialViewModel.create("1", "Name", 10);
            spyOn(Object.prototype, "alert");
            spyOn(Meteor, "call").andCallFake(function (functionName, id, callback) {
                callback("Error", null);
                expect(alert).toHaveBeenCalled();
            });

            model.removeRegistration();

            expect(Meteor.call).toHaveBeenCalled();
            expect(Meteor.call.mostRecentCall.args[0]).toEqual("removeRegistration");
            expect(Meteor.call.mostRecentCall.args[1]).toEqual("1");
        });
    });
})();