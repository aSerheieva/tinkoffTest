import {browser, by, element, ElementFinder} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";


export class Button {

    public static returnByText(buttonText:string): ElementFinder{
        return element(by.buttonText(buttonText));
    };

    public static async clickByText(buttonText:string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Клик по кнопке '${buttonText}'`, async () => {
            await this.returnByText(buttonText).click();
            await MyWait.waitElemIsClickable(waitElem);
        });
    };


}