describe("Header template - No Mocks", function() {
    it("should not show tutorial link to anonymous user", function () {
        var div = document.createElement("DIV");
        var comp = UI.render(Template.header);

        UI.insert(comp, div);

        expect($(div).find("#tutorialsLink")[0]).not.toBeDefined();
    });

    it("should be able to login normal user", function (done) {
        Meteor.loginWithPassword('normal@example.com', 'apple1', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should show tutorial link to registered user", function () {
        var div = document.createElement("DIV");
        var comp = UI.render(Template.header);

        UI.insert(comp, div);

        expect($(div).find("#tutorialsLink")[0]).toBeDefined();
    });

    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should be able to login normal user", function (done) {
        Meteor.loginWithPassword('admin@example.com', 'apple1', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should show admin link to admins user", function () {
        var div = document.createElement("DIV");
        var comp = UI.render(Template.header);

        UI.insert(comp, div);

        expect($(div).find("#adminLink")[0]).toBeDefined();
    });

    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should not show admin link to non-admins", function () {
        var div = document.createElement("DIV");
        var comp = UI.render(Template.header);

        UI.insert(comp, div);

        expect($(div).find("#adminLink")[0]).not.toBeDefined();
    });
});