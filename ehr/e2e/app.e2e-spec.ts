import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for ehr', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be ehr', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('ehr');
    })
  });

  it('navbar-brand should be ehr@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('ehr@0.0.1');
  });

  
    it('appointment component should be loadable',() => {
      page.navigateTo('/appointment');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('appointment');
    });

    it('appointment table should have 4 columns',() => {
      page.navigateTo('/appointment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('Bill component should be loadable',() => {
      page.navigateTo('/Bill');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Bill');
    });

    it('Bill table should have 6 columns',() => {
      page.navigateTo('/Bill');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('HospitalSupplies component should be loadable',() => {
      page.navigateTo('/HospitalSupplies');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('HospitalSupplies');
    });

    it('HospitalSupplies table should have 4 columns',() => {
      page.navigateTo('/HospitalSupplies');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('HospitalMoneyPool component should be loadable',() => {
      page.navigateTo('/HospitalMoneyPool');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('HospitalMoneyPool');
    });

    it('HospitalMoneyPool table should have 3 columns',() => {
      page.navigateTo('/HospitalMoneyPool');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });

  
    it('SampleAsset component should be loadable',() => {
      page.navigateTo('/SampleAsset');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('SampleAsset');
    });

    it('SampleAsset table should have 3 columns',() => {
      page.navigateTo('/SampleAsset');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(3); // Addition of 1 for 'Action' column
      });
    });

  
    it('PatientInfo component should be loadable',() => {
      page.navigateTo('/PatientInfo');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('PatientInfo');
    });

    it('PatientInfo table should have 10 columns',() => {
      page.navigateTo('/PatientInfo');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });

  

});
