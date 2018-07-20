import {browser, Config} from "protractor";
import {initReport} from "./helpers/reporter";

export let config: Config = {
    chromeOnly: true,
    directConnect: true,
    capabilities: {
        browserName: 'chrome',
    },
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    specs: [
        './test/*.spec.js',
    ],

    exclude: [ ],

    params: {
        waitWebElemTime: 20000,
    },


    onPrepare: async () => {
        await browser.waitForAngularEnabled(false);
        await browser.manage().window().maximize();
        await initReport();
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000,
    }
};