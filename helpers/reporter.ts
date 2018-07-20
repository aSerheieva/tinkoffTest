import {SpecReporter} from "jasmine-spec-reporter";
import {browser} from "protractor";
import {paymentsData} from "../staticData/paymentsData";
import {paymentPageElement} from "../elemAndComponent/element";

declare const allure: any;
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const AllureReporter = require('jasmine-allure-reporter');


export function  initReport(){
    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(new SpecReporter());

    jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: './resOut/jsmReports/',
        screenshotsFolder: 'images',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true
    }));

    jasmine.getEnv().addReporter(new AllureReporter({
        resultsDir: './resOut/allureReports/'
    }));
};

export async function myCreateAllureStep (description:string, stepFunc: Function) {
    await allure.createStep(description, async () => {
        try {
            await stepFunc();
        }
        catch (error) {
            await screen();
            throw error;
        }
    })();
}

//можно улучить, например передавать метод
export async function expectMy (current:string, expected: string) {
    await allure.createStep(`Сравнение текущего ${current} с ожидаемым ${expected}`, async () => {
        await expect(current).toEqual(expected);
    })();
}


async function screen(done = undefined){
    return browser.takeScreenshot()
        .then((png)=> {
            allure.createAttachment('Screenshot', function () {
                return new Buffer(png, 'base64')
            }, 'image/png')();
        }).then(() => {
            if (done) {
                done();
            }
        });
}