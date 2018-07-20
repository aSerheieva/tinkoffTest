import {async} from "q";
import {GlobalsMethods} from "../logicBisness/globalMethod";
import {commonBtnNames, commonTopMenuNames, nameError, urls} from "../staticData/global";
import {commonElement, mainPageElement, paymentPageElement, paymentPageFormElement} from "../elemAndComponent/element";
import {browser} from "protractor";
import {MainMenu} from "../elemAndComponent/mainMenuComponrnt";
import {PaymentMethod} from "../logicBisness/paymentsFun/paymentMethod";
import {paymentsData} from "../staticData/paymentsData";
import {expectMy} from "../helpers/reporter";
import {Button} from "../elemAndComponent/btnComponent";
import {SearchInput} from "../elemAndComponent/searchComponent";
import {Input} from "../elemAndComponent/inputComponent";
import {StringArray} from "../utils/stringArray";

describe(`Проверка станицы платежей`, () => {

    beforeEach(async () => {
        await GlobalsMethods.goToUrl(urls.mainPage, mainPageElement.mainPageElement);
        await MainMenu.clickOnTopSecondMenu(commonTopMenuNames.payment, paymentPageElement.paymentPageMenu);
        // await MainMenu.clickOnBottomMenu(commonTopMenuNames.payment, paymentPageElement.paymentPageMenu); // для проверки работы, из-за бага с верхнем меню
    });

    afterEach(async()=>{
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    });

   it(`[P01] Перехода на форму 'Оплатить ЖКУ в Москве'`, async() => {
        await PaymentMethod.selectCategoryPaymentByName(paymentsData.paymentsType, paymentPageElement.paymentProviderList.last());
        await PaymentMethod.setCityRegion(paymentsData.cityMoscowWithoutCity, paymentsData.cityMoscow);
        await expectMy(await paymentPageElement.paymentProviderList.first().getText(), paymentsData.serviceGKHMoscow);
        await  PaymentMethod.clickOnProviderByNumber(0);
        await GlobalsMethods.clickOnTabsByName(paymentsData.nameTwoTabs, Button.returnByText(commonBtnNames.paymentMoscow));
        await expect(await paymentPageFormElement.providerPayerCode.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerPeriod.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerSumFree.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerSunPayment.isPresent()).toEqual(true);
    });

    it(`[P02] Быстрый поиск`, async() => {
        await SearchInput.sendText(paymentsData.serviceGKHMoscow, commonElement.searchInputRow.first());
        await SearchInput.selectFoundedElementByNumber(0, Button.returnByText(commonBtnNames.paymentInfoDept));
        await GlobalsMethods.clickOnTabsByName(paymentsData.nameTwoTabs, Button.returnByText(commonBtnNames.paymentMoscow));
        await expect(await paymentPageFormElement.providerPayerCode.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerPeriod.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerSumFree.isPresent()).toEqual(true);
        await expect(await paymentPageFormElement.providerSunPayment.isPresent()).toEqual(true);
    });

    it(`[P03] Отсутствие поставщика из Москвы в списке другого города`, async() => {
        await PaymentMethod.selectCategoryPaymentByName(paymentsData.paymentsType, paymentPageElement.paymentProviderList.last());
        await PaymentMethod.setCityRegion(paymentsData.cityStPetersburgWithoutCity, paymentsData.cityStPetersburg);
        await SearchInput.sendText(paymentsData.serviceGKHMoscow, commonElement.searchInputRow.get(0));
        await expectMy(await commonElement.searchInputRow.get(0).getText(), paymentsData.notFoundSearch);
    });

});

describe(`Проверка вывода ошибок формы 'Оплатить ЖКУ в Москве'`, () => {

    beforeEach(async () => {
        await GlobalsMethods.goToUrl(urls.mainPage, mainPageElement.mainPageElement);
        await MainMenu.clickOnTopSecondMenu(commonTopMenuNames.payment, paymentPageElement.paymentPageMenu);
        // await MainMenu.clickOnBottomMenu(commonTopMenuNames.payment, paymentPageElement.paymentPageMenu); // для проверки работы, из-за бага с верхнем меню
        await PaymentMethod.setCityRegion(paymentsData.cityMoscowWithoutCity, paymentsData.cityMoscow);
        await SearchInput.sendText(paymentsData.serviceGKHMoscow, commonElement.searchInputRow.first());
        await SearchInput.selectFoundedElementByNumber(0, Button.returnByText(commonBtnNames.paymentInfoDept));
        await GlobalsMethods.clickOnTabsByName(paymentsData.nameTwoTabs, Button.returnByText(commonBtnNames.paymentMoscow));
    });

    afterEach(async()=>{
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.executeScript('window.localStorage.clear();');
        await browser.driver.manage().deleteAllCookies();
    });

    it(`[P04] Negative. Проверка валидации формы оплаты на ввод пустых поле`, async() => {
        await Button.clickByText(commonBtnNames.paymentMoscow, paymentPageFormElement.errorMsg.get(0));
        const cntErr:number = await paymentPageFormElement.errorField.count();
        await expect(paymentPageFormElement.errorMsg.count()).toEqual(  cntErr, 'сравнение количества сообщений и обязательных полей');
        await GlobalsMethods.checkArrayString(paymentPageFormElement.errorMsg, nameError.errorEmpty);
    });

    it(`[P05] Negative. Проверка валидации формы оплаты на ввод букв и символов`, async() => {
        await Input.sendText(paymentsData.unvalidText, paymentPageFormElement.providerPayerCode , paymentPageFormElement.errorMsg.get(0) );
        await expectMy(await paymentPageFormElement.providerPayerCode.getAttribute('value'), '');
        await Input.sendText(paymentsData.unvalidText, paymentPageFormElement.providerPeriod , paymentPageFormElement.errorMsg.get(1) );
        await expectMy(await paymentPageFormElement.providerPeriod.getAttribute('value'), '');
        await Input.sendText(paymentsData.unvalidText, paymentPageFormElement.providerSunPayment , paymentPageFormElement.errorMsg.get(2) );
        await expectMy(await paymentPageFormElement.providerSunPayment.getAttribute('value'), '');
    });

    it(`[P06] Negative. Проверка вывода ошибок валидации формы оплаты поле  "Код плательщика за ЖКУ в Москве" `, async() => {
        await Input.sendText(paymentsData.providerPayerCodeTest, paymentPageFormElement.providerPayerCode , paymentPageFormElement.errorMsg.get(0) );
        await expectMy(await paymentPageFormElement.providerPayerCode.getAttribute('value'), paymentsData.providerPayerCodeTest);
        await expectMy(await paymentPageFormElement.errorMsg.get(0).getText(), nameError.errorUnvalidValue);
        const helpCnt:number = await paymentPageFormElement.errorField.count();
        await Input.sendText(paymentsData.providerPayerCodeTest+paymentsData.providerPayerCodeTest,
                    paymentPageFormElement.providerPayerCode , paymentPageFormElement.providerPayerCodeWait, true);
        await expectMy(await paymentPageFormElement.providerPayerCode.getAttribute('value'), paymentsData.providerPayerCodeTest2);
        await expect((await paymentPageFormElement.errorMsg.count()) === helpCnt).toEqual(  false);
    });

    it(`[P07] Negative. Проверка вывода ошибок валидации формы оплаты поле  "За какой период оплачиваете коммунальные услуги" `, async() => {
        await Input.sendText(paymentsData.providerPeriodTest, paymentPageFormElement.providerPeriod , paymentPageFormElement.errorMsg.get(1) );
        await expectMy(await paymentPageFormElement.providerPeriod.getAttribute('value'), paymentsData.providerPeriodTest2);
        await expectMy(await paymentPageFormElement.errorMsg.get(1).getText(), nameError.errorUncorrectedValue);
    });

    it(`[P08] Negative. Проверка вывода ошибок валидации формы оплаты поле  "Сумма платежа, ₽" `, async() => {
        await Input.sendText(paymentsData.providerSunPaymentTest, paymentPageFormElement.providerSunPayment , paymentPageFormElement.errorMsg.get(2) );
        await expectMy(await paymentPageFormElement.providerSunPayment.getAttribute('value'), paymentsData.providerSunPaymentTest);
        await expectMy(await paymentPageFormElement.errorMsg.get(2).getText(), nameError.errorMinSum);

        await Input.sendText(paymentsData.providerSunPaymentTest2, paymentPageFormElement.providerSunPayment , paymentPageFormElement.errorMsg.get(2) );
        await expectMy(await paymentPageFormElement.providerSunPayment.getAttribute('value'), StringArray.transformNumberToStringSum(paymentsData.providerSunPaymentTest2));
        await expectMy(await paymentPageFormElement.errorMsg.get(2).getText(), nameError.errorMaxSum);

    });

});