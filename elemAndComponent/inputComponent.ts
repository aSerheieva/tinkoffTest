import {browser, by, ElementFinder, protractor} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";


export class Input {

    public static async sendText(sendText:string, inputElem:ElementFinder, waitElem: ElementFinder, repet: Boolean = false) {
        await myCreateAllureStep(`Отправка текста '${sendText}' в поле  '${sendText}'`, async () => {
            await inputElem.click();
            await (await inputElem).clear().sendKeys(sendText);
            await browser.actions().sendKeys(protractor.Key.ENTER).perform();
            if(repet){
                await MyWait.waitElemIsNotDisplayed(waitElem);
            }else {
                await MyWait.waitElemIsDisplayed(waitElem);
            }
        });
    };

}