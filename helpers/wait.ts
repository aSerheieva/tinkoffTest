import {browser, ElementFinder, ExpectedConditions as expCon} from "protractor";

export class MyWait {

    public static async waitElemIsDisplayed (webElement:ElementFinder) {
        try {
            await browser.wait(expCon.visibilityOf(webElement), browser.params.waitWebElemTime );
        }
        catch (err) {
            if(err.name === 'TimeoutError') {
                throw `Элемент не найден, время ожидания истекло`
            }
            else {
                throw err.name
            }
        }
    };

    public static async waitElemIsNotDisplayed (webElement:ElementFinder){
        try{
            await browser.wait(expCon.invisibilityOf(webElement), browser.params.waitWebElemTime );
        }
        catch (err) {
            if(err.name === 'TimeoutError') {
                throw `Элемент не найден, время ожидания истекло`
            }
            else {
                throw err.name
            }
        }
    };

    public static async waitElemIsClickable (webElement:ElementFinder) {
        try{
            await browser.wait(expCon.elementToBeClickable(webElement),
                browser.params.waitWebElementMaxTimeout );
        }
        catch (err) {
            if(err.name === 'TimeoutError') {
                throw `Element is not clickable, waiting time is over`
            }
            else {
                throw err.name
            }
        }
    };

}