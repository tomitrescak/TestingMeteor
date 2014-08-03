// file: tests/tutorials-template-jasmine-unit.js
(function () {
    "use strict";
    describe("TutorialTemplate", function () {
        it("function canDelete should return true only when tutorial has no registrations", function () {
            // stub values called with accessor "this.currentCapacity"
            Template.tutorials.currentCapacity = 0;
            expect(Template.tutorials.canDelete()).toBeTruthy();
            // cleanup
            delete Template.tutorials.currentCapacity;
        });
        it("function canDelete should return false when there are registrations", function () {
            // stub values called with accessor "this.currentCapacity"
            Template.tutorials.currentCapacity = 1;
            expect(Template.tutorials.canDelete()).toBeFalsy();
            // cleanup
            delete Template.tutorials.currentCapacity;
        });
        it("function canRegister should return true when capacity is available and student is not yet registered", function () {
            // stub values called with accessor "this.currentCapacity"
            Template.tutorials.currentCapacity = 1;
            Template.tutorials.capacity = 2;
            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 0; }});

            expect(Template.tutorials.canRegister()).toBeTruthy();

            // cleanup
            delete Template.tutorials.currentCapacity;
            delete Template.tutorials.capacity;
        });

        it("function canRegister should return false when reached capacity is available and student is not yet registered", function () {
            // stub values called with accessor "this.currentCapacity"
            Template.tutorials.currentCapacity = 1;
            Template.tutorials.capacity = 1;

            expect(Template.tutorials.canRegister()).toBeFalsy();

            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 1; }});
            Template.tutorials.capacity = 2;

            expect(Template.tutorials.canRegister()).toBeFalsy();

            // cleanup
            delete Template.tutorials.currentCapacity;
            delete Template.tutorials.capacity;
        });

        it("function isRegistered should return true when student is registered for the current class", function () {
            // stub values called with accessor "this.currentCapacity"
            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 1; }});
            expect(Template.tutorials.isRegistered()).toBeTruthy();
        });

        it("function isRegistered should return false when student is not registered for the current class", function () {
            // stub values called with accessor "this.currentCapacity"
            spyOn(TutorialRegistrations, "find").andReturn({count: function() { return 0; }});
            expect(Template.tutorials.isRegistered()).toBeFalsy();
        });

        it("should be able to register for tutorial by clicking on the '.registerForTutorial' button", function () {
            Object.prototype.registerStudent = function() {};
            spyOn(Object.prototype, "registerStudent");
            Template.tutorials.fireEvent("click .registerForTutorial", {preventDefault: function() {}});
            expect(Object.prototype.registerStudent).toHaveBeenCalled();
            delete Object.prototype.registerStudent;

        });

        it("should be able to register for tutorial by clicking on the '.deregisterForTutorial' button", function () {
             Object.prototype.removeRegistration = function() {};
            spyOn(Object.prototype, "removeRegistration");
            Template.tutorials.fireEvent("click .deregisterForTutorial", {preventDefault: function() {}});
            expect(Object.prototype.removeRegistration).toHaveBeenCalled();

        });
    });
})();

