import {browser, by, ElementFinder, protractor} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";


export class Input {

    public static async sendText(sendText:string, inputElem:ElementFinder, waitElem: ElementFinder) {
        await myCreateAllureStep(`Отправка текста '${sendText}' в поле  '${sendText}'`, async () => {
            await inputElem.click();
            await (await inputElem).clear().sendKeys(sendText);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            await MyWait.waitElemIsDisplayed(waitElem);
        });
    };

}