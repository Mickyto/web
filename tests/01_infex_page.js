module.exports = {

    'if there is Skukit Home title of page' : function (browser) {
        browser
            .url('http://app:3000')
            .waitForElementVisible('body', 1000)
            .pause(20000)
            .assert.title('skukit HOME');
        browser.end();
    }
};








