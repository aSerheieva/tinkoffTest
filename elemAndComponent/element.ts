import {by, element, ElementFinder} from "protractor";

export const commonElement:any = {
    searchInput: element(by.css('input[data-qa-file="SearchInput"]')),
    searchInputRow: element.all(by.css('[data-qa-file="GridColumn"]')),
    tabsList: element.all(by.css('[data-qa-file="Tabs"] li a')),
    tabsListByName: (name:string) : ElementFinder=>{
        return element(by.cssContainingText('[data-qa-file="Tabs"] li a', name))
    },
    topMenuElemByName: (name:string) : ElementFinder=>{
        return element(by.cssContainingText('[name="headerSlim"] span[data-qa-file="SecondMenu"]', name))
    },
    bottomMenuElemByName: (name:string) : ElementFinder => {
        return element(by.cssContainingText('li [data-qa-file="Footer"] a', name))
    },
};

export const mainPageElement:any = {
    mainPageElement: element(by.css('[name="bannerSlider"]')),
};

export const paymentPageElement:any = {
    paymentsCatalogHeader: element(by.css('div[data-qa-file="PaymentsCatalogHeader"]')),
    paymentPageMenu: element(by.css('div[data-qa-file="PaymentsPageMenu"]')),
    paymentProviderSection: element(by.css('section[data-qa-file="UILayoutSection"]')),
    paymentProviderList: element.all(by.css('section[data-qa-file="UILayoutSection"] li')),
    paymentRegion: element(by.xpath(`//span[contains(@class, 'PaymentsCatalogHeader__regionSelect')]`)),
    paymentRegionList: element.all(by.css('a[data-qa-file="Link"]')),
    paymentRegionListByName: (name:string) : ElementFinder => {
        return element(by.cssContainingText('[data-qa-file="UIRegions"] a .ui-link__text ', name))
    },
    paymentPageMenuByName:(name:string) : ElementFinder => {
        return element(by.cssContainingText('a[data-qa-file="Link"]', name))
    },
};

export const paymentPageFormElement:any = {
    providerPayerCode:element(by.css('input[name="provider-payerCode"]')),
    providerPayerCodeWait:element(by.css('input[name="provider-payerCode"].ui-input_focused')),
    providerPeriod:element(by.css('input[name="provider-period"]')),
    providerPeriodWait:element(by.css('input[name="provider-period"].ui-input_focused')),
    providerSumFree:element.all(by.css('input[data-qa-file="StatelessInput"]')).get(0),
    providerSumWait:element(by.css('input[data-qa-file="StatelessInput"].ui-input_focused')),
    providerSunPayment:element.all(by.css('input[data-qa-file="StatelessInput"]')).get(1),
    errorMsg: element.all(by.css('.ui-form-field-error-message')),
    errorField: element.all(by.xpath(`//*[contains(@class, 'error')] //input`)),
};