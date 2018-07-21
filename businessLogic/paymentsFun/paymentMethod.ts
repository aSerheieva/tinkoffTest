import {browser, ElementFinder} from "protractor";
import {myCreateAllureStep} from "../../helpers/reporter";
import {MyWait} from "../../helpers/wait";
import {paymentPageElement} from "../../elemAndComponent/element";
import {Button} from "../../elemAndComponent/btnComponent";
import {commonBtnNames} from "../../staticData/global";

export class PaymentMethod {

    public static async selectCategoryPaymentByName(name: string, waitElem: ElementFinder) {
        await myCreateAllureStep(`Перейти в ${name} платежи`, async () => {
            await paymentPageElement.paymentPageMenuByName(name).click();
            await MyWait.waitElemIsDisplayed(waitElem);
        });
    };

    public static async setCityRegion(city: string, cityList:string) {
        await myCreateAllureStep(`Установить оплату по региону ${city}`, async () => {
            let currentCity:string = await paymentPageElement.paymentRegion.getText();
            if(currentCity != city){
                await paymentPageElement.paymentRegion.click();
                await MyWait.waitElemIsDisplayed(paymentPageElement.paymentRegionList.first());
                await paymentPageElement.paymentRegionListByName(cityList).click();
                await MyWait.waitElemIsDisplayed(paymentPageElement.paymentRegion);
            }

        });
    };

    public static async clickOnProviderByNumber(num: number) {
        await myCreateAllureStep(`Выбрать поставщика из списка под номером ${num}`, async () => {
                await paymentPageElement.paymentProviderList.get(num).click();
                await MyWait.waitElemIsDisplayed(Button.returnByText(commonBtnNames.paymentInfoDept));

        });
    };

    public static async scrollProviderList(cnt: number) {
        await MyWait.waitElemIsClickable(paymentPageElement.paymentProviderList.get(0));
        let i: number = 0;
        let curVal: number = await paymentPageElement.paymentProviderList.count();
        while(curVal%30 == 0 && i < cnt) {
            await browser.executeScript(`document.querySelectorAll('section[data-qa-file="UILayoutSection"] li')[${curVal-1}].scrollIntoView(false)`);
            await MyWait.waitElemIsClickable(paymentPageElement.paymentProviderList.get(curVal-1));
            curVal = await paymentPageElement.paymentProviderList.count();
            i++;
        }
    }

}