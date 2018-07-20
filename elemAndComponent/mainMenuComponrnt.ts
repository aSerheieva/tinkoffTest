import {browser, ElementFinder} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";
import {commonElement} from "./element";


export class mainMenu {

    public static async clickOnTopSecondMenu(name: string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Клик по пункту в верхнем меню (второй уровень) ${name}`, async () => {
            await commonElement.topMenuElemByName(name).click();
            await MyWait.waitElemIsDisplayed(waitElem)
        });
    };

    public static async clickOnBottomMenu(name: string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Клик по пункту в верхнем меню (второй уровень) ${name}`, async () => {
            await commonElement.bottomMenuElemByName(name).click();
            await MyWait.waitElemIsDisplayed(waitElem)
        });
    };


}
