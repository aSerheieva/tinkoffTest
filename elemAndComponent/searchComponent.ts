import {browser, by, element, ElementFinder} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";
import {commonElement} from "./element";


export class SearchInput {

    public static async sendText(sendText:string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Отправка текста '${sendText}' в строку поиска`, async () => {
            await commonElement.searchInput.click();
            await commonElement.searchInput.sendKeys(sendText);
            await MyWait.waitElemIsClickable(waitElem);
        });
    };

    public static async selectFoundedElementByNumber(num:number, waitElem: ElementFinder) {
        await myCreateAllureStep(`Выбрать '${num}' элемент в результатах поиска`, async () => {
            await commonElement.searchInputRow.get(num).click();
            await MyWait.waitElemIsClickable(waitElem);
        });
    };


}