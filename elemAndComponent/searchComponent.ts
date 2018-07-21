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

    public static async selectFoundedElementByName(name:string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Выбрать пункт '${name}' в результатах поиска`, async () => {
            let indexList:number = -1;
            await commonElement.searchInputRow.each(async function(element, index) {
                let text:string = await element.getText();
                if ( text.includes(name)){
                    indexList = index;
                }
            });
            if (indexList == -1){
                throw `Пункта ${name} нет в списке`
            }
            await commonElement.searchInputRow.get(indexList).click();
            await MyWait.waitElemIsClickable(waitElem);
        });
    };


}