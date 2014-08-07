// tests/google.js
module.exports = {
    "Test admin functionality - create, modify and delete tutorial" : function (client) {
        client
            .url("http://localhost:3000/createTutorial")
            .waitForElementVisible("body", 1000)
            .click("li#login-dropdown-list a")
            .pause(100)
            .assert.visible("input#login-email")
            .assert.visible("input#login-password")
            .setValue("input#login-email", "admin@example.com")
            .setValue("input#login-password", "apple1")
            .click("button#login-buttons-password")
            .assert.visible("input#tutorialName")
            .assert.visible("input#tutorialCapacity")
            .assert.visible("button#modifyTutorialButton")
            .setValue("input#tutorialName", "NightWatchTutorial")
            .setValue("input#tutorialCapacity", "10")
            .click("button#modifyTutorialButton")
            .pause(2000)
            .assert.urlEquals('http://localhost:3000/tutorials')
            .end();
    }
};