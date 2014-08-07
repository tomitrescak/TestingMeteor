module.exports = {
    "Hello World" : function (client) {
        client
            .url("http://127.0.0.1:3000")
            .waitForElementVisible("body", 1000)
            .assert.title("Hello World")
            .end();
    }
};