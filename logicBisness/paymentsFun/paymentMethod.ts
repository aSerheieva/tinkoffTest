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

    public static async checkR(num: number) {
        await myCreateAllureStep(`Выбрать поставщика из списка под номером ${num}`, async () => {
            await paymentPageElement.paymentProviderList.get(num).click();
            await MyWait.waitElemIsDisplayed(Button.returnByText(commonBtnNames.paymentInfoDept));

        });
    };

}