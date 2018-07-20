import {browser, ElementFinder} from "protractor";
import {myCreateAllureStep} from "../helpers/reporter";
import {MyWait} from "../helpers/wait";
import {commonElement} from "../elemAndComponent/element";


export class GlobalsMethods {

    public static async goToUrl(url: string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Переход на страницу ${url}`, async () => {
            await browser.get(url);
            await MyWait.waitElemIsDisplayed(waitElem)
        });
    };

    public static async clickOnTabsByName(name: string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Переключить на вкладку с названием ${name}`, async () => {
            await commonElement.tabsListByName(name).click();
            await MyWait.waitElemIsDisplayed(waitElem);
        });
    };

    public static async checkArrayString(arrayVal: Array<string>, checkValue:string| Array<string>) {
        await myCreateAllureStep(`Проверка начений на совпадение ${checkValue}`, async () => {
            if (typeof checkValue == 'string'){
                for(let i =0; i<arrayVal.length;i++){
                    await expect(arrayVal[i]).toEqual(checkValue);
                }
            }else{
                if(arrayVal.length !== checkValue.length){ throw 'Несовпадение по длине массивов'};
                for(let i =0; i<arrayVal.length;i++){
                    await expect(arrayVal[i]).toEqual(checkValue[i]);
                }
            }
        });
    };

};




