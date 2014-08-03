//file:/tests/jasmine/client/tutorials-template-spec.js
describe("Tutorials template", function() {
    var div;
    beforeEach(function() {
        div = document.createElement("DIV");
    })

    it("should show a list of tutorials when there are some available", function () {
        var data = {tutorials: [{}, {}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);

        UI.insert(comp, div);

        expect($(div).find(".tutorialLine").length).toEqual(2);
    });

    it("should show a warning when no tutorials are available", function () {
        var comp = UI.renderWithData(Template.tutorials, {tutorials: {count: function() { return 0; }}});

        UI.insert(comp, div);

        expect($(div).find("#noTutorialsWarning")[0]).toBeDefined();
    });

    it ("should sort tutorials by name", function() {
        var route = _.findWhere(Router.routes, {name: "tutorials"});
        spyOn(Tutorials, "find").and.returnValue({});

        var data = route.options.data();

        expect(Tutorials.find).toHaveBeenCalled();
        expect(Tutorials.find.calls.mostRecent().args[0]).toEqual({});
        expect(Tutorials.find.calls.mostRecent().args[1].sort.name).toEqual(1);
        expect(data).toEqual({tutorials: {}});
    });

it("should show create, modify and delete button to admin user", function () {
    spyOn(UI._globalHelpers, "isInRole").and.returnValue(true);

    var data = {tutorials: [{currentCapacity: 0}, {currentCapacity: 0}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);
        UI.insert(comp, div);

        expect($(div).find("#createTutorial")[0]).toBeDefined();
        expect($(div).find(".modifyTutorial").length).toEqual(2);
        expect($(div).find(".removeTutorial").length).toEqual(2);
    });

    it("should not show create, modify and delete button to non-admin user", function () {
        spyOn(UI._globalHelpers, "isInRole").and.returnValue(false);

        var data = {tutorials: [{}, {}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);
        UI.insert(comp, div);

        expect($(div).find("#createTutorial")[0]).not.toBeDefined();
        expect($(div).find(".modifyTutorial")[0]).not.toBeDefined();
        expect($(div).find(".removeTutorial")[0]).not.toBeDefined();
    });

    it("should not show delete button for tutorials with active registrations", function () {
        spyOn(UI._globalHelpers, "isInRole").and.returnValue(true);

        var data = {tutorials: [{currentCapacity: 1}, {currentCapacity: 0}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);
        UI.insert(comp, div);

        expect($(div).find(".removeTutorial").length).toEqual(1);
    });

    it("should show register button to students", function () {
        spyOn(UI._globalHelpers, "isInRole").and.returnValue(false);
        spyOn(TutorialRegistrations, "find").and.returnValue({count: function() { return 0; }});

        var data = {tutorials: [{currentCapacity: 1, capacity: 1}, {currentCapacity: 0, capacity: 1}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);
        UI.insert(comp, div);

        expect($(div).find(".registerForTutorial").length).toEqual(1);
    });

    it("should show cancel registration button to students", function () {
        spyOn(UI._globalHelpers, "isInRole").and.returnValue(false);
        spyOn(TutorialRegistrations, "find").and.returnValue({count: function() { return 1; }});

        var data = {tutorials: [{currentCapacity: 1, capacity: 1}, {currentCapacity: 0, capacity: 1}]};
        data.tutorials.count = function() { return 2; };

        var comp = UI.renderWithData(Template.tutorials, data);
        UI.insert(comp, div);

        expect($(div).find(".deregisterForTutorial").length).toEqual(2);
    });
});