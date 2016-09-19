module.exports = {

    'if there is Skukit Home title of page' : function (browser) {
        browser
            .url('http://localhost:3000')
            .pause(1000)
            .assert.title('skukit HOME');
        browser.end();
    }
};








