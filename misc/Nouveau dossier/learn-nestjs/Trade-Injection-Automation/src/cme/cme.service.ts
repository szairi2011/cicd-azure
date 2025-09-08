import { HttpCode, Injectable } from '@nestjs/common';
// import { Builder, By, Key, until } from 'selenium-webdriver';
const {Builder, By, Key, until} = require('selenium-webdriver') 
const chrome = require('selenium-webdriver/chrome') 

const chromedriver = require('chromedriver')
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

//const rp = require('request-promise');
const cheerio = require('cheerio')
const axios = require("axios")


@Injectable()
export class CmeService {

    driver1 = new Builder().forBrowser('chrome').build()        
    //driver1 = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize({width: 640,height: 480})).build();
    
    getCurrentOpenPrice = async (): Promise<number> => {
        let success = false
        let driver2 = new Builder().forBrowser('chrome').build()   
        //let driver2 = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().windowSize({width: 640,height: 480})).build();
        
           while (!success) {
            try {
                await driver2.get('https://www.cmegroup.com/trading/interest-rates/stir/eurodollar_quotes_settlements_futures.html')
                await driver2.wait(until.elementLocated(By.css("#settlementsFuturesProductTable > tbody > tr:nth-child(1) > td:nth-child(2)")),60000)
                let price = await driver2.findElement(By.css('#settlementsFuturesProductTable > tbody > tr:nth-child(1) > td:nth-child(2)')).getText()
                //It is better to use driver.close() when dealing with multiple tabs or windows.
                await driver2.close()
                return price
            }
            catch (error) {
                console.log(`An exception occured while getting external price ${error} `)
            }
    } }
    
    loginPhase1 = async (): Promise<Object> => {
        let sucess = false
        while (!sucess) {
            try {
                await this.driver1.get('https://loginnr.cmegroup.com/sso/accountstatus/showAuth.action') 
                await this.driver1.findElement(By.id('user')).sendKeys('TUNISQA2', Key.ENTER)
                await this.driver1.findElement(By.id('pwd')).sendKeys('March9877!', Key.ENTER)
                return {
                    message: "Success.",
                }   
            }
            catch (exception) {
                console.log(`exception occured during 1st login phase ${exception}. Trying again...`)
            }
    
        } }
    
    loginPhase2 = async (passcode: number): Promise<Object> => {

        let sucess = false

        if (await this.driver1.getTitle()!=="Duo Security Two-Factor Authentication") {
            return {
                message: "You are not authenticated",
            }   
        }
        
        
            try {
                    // the login page consists of an internal frame, in order to continue the process we must switch into that other frame
                    await this.driver1.wait(until.elementLocated(By.tagName("iframe")),60000)
                    await this.driver1.switchTo().frame(this.driver1.findElement(By.tagName("iframe")))
                    let currentUrl = await this.driver1.getCurrentUrl()
                    await this.driver1.findElement(By.css("#passcode")).click()    
                    await this.driver1.findElement(By.name('passcode')).sendKeys(passcode,Key.ENTER)
                    await this.driver1.sleep(5000)
                    // if we still have the same url that means that the passcode is incorrect and the login failed
                    
                    if (await this.driver1.getCurrentUrl() !== currentUrl) {
                        return {
                            message: "Success.",
                        }   
                    } 
                    await this.driver1.navigate().refresh()
                    return {
                        message: "Operation failed. Try again with another passcode.",
                    }   
                }
            catch (exception) {
                return {
                    message: "Operation failed. Try again with another passcode.",
                }      
            }
    }
    
    tradeEntry = async (numberOfTradeInjection:number): Promise<Object> => {

        let currentPrice :number= 0

        await this.getCurrentOpenPrice().then((price) => {currentPrice = price} ).catch((err) => 
        {
            return  {
        message: "Error occured while retrieving exteernal price. Try again."}
    }
        )
        
        let successfulInjection = false

        if (await this.driver1.getCurrentUrl()==="https://loginnr.cmegroup.com/sso/accountstatus/showAuth.action" 
            ||await this.driver1.getTitle()==="Duo Security Two-Factor Authentication" ||  await this.driver1.getCurrentUrl()==="data:," ) {
            return {
                message: "You are not authenticated",
            }   
        }
    
        while (!successfulInjection) {
            try {
                await this.driver1.get('https://fecplus-nr-cme.cmegroup.com/fec/?pe=CME&fe=CME&panel=transferEntrySearchPanel&nobar=Y#/search_1614346136048')
                await this.driver1.wait(until.elementLocated(By.id('tradeType')),60000)
                await this.driver1.findElement(By.id("tradeType")).click()
                await this.driver1.findElement(By.css('#tradeType > option:nth-child(2)')).click()
                await this.driver1.wait(until.elementsLocated(By.css('.transferEntry')),60000)
                await this.driver1.sleep(5000)
                this.driver1.findElement(By.css("#firmId > option:nth-child(2)")).click()
                this.driver1.findElement(By.css("#marketSide > option:nth-child(2)")).click()    
                this.driver1.findElement(By.name('productCode')).sendKeys('ED')
                this.driver1.findElement(By.name('productPeriod')).sendKeys('03/22')
                this.driver1.findElement(By.name('accountId')).sendKeys('DorraSelenium')
                this.driver1.findElement(By.name('orderId')).sendKeys(`DorraSeleniumOrder${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`)
                this.driver1.findElement(By.css("#origin > option:nth-child(2)")).click()
                this.driver1.findElement(By.css("#cti > option:nth-child(3)")).click()
                this.driver1.findElement(By.css("#tradedAs > option:nth-child(2)")).click()
                this.driver1.findElement(By.css("#orderType > option:nth-child(2)")).click()
                this.driver1.findElement(By.name('broker')).sendKeys('TEN')
                this.driver1.findElement(By.name('oppositeFirmId')).sendKeys('289')
                this.driver1.findElement(By.name('oppositeBroker')).sendKeys('TEN')
                this.driver1.findElement(By.css("#timeBrackets > option:nth-child(22)")).click()
                await this.driver1.findElement(By.xpath("//label[normalize-space()='Qty']/following-sibling::input")).click()
                await this.driver1.findElement(By.xpath("//label[normalize-space()='Qty']/following-sibling::input")).sendKeys('10').catch((error) => {
                    return {
                        message: `Operation failed.`,
                        error: error
                    }
                })
                
    
                await this.driver1.findElement(By.xpath("//label[normalize-space()='Price']/following-sibling::input")).sendKeys(currentPrice).catch((error) => {
                    return {
                        message: `Operation failed.`,
                        error: error
                    }
                })
                for (let i=0;i<numberOfTradeInjection;i++) {
                    await this.driver1.sleep(2000)
                    await this.driver1.findElement(By.xpath("//button[normalize-space()='Apply']/following-sibling::input")).click()
            
                    await this.driver1.findElement(By.xpath("//button[normalize-space()='Apply']")).click()
                
                    await this.driver1.findElement(By.xpath("(//button[normalize-space()='Save'])[2]")).click()
                
                
                    // in order to avoid the ElementNotInteractableError that occurs when selecting the element through xpath/css/... we use the keyboard to perform the action
                    await this.driver1.actions().keyDown(Key.TAB).perform()
                    await this.driver1.actions().keyDown(Key.ENTER).perform()
                    
                }
                //refreshing the page is essential in case we want to perform more than one injection per function call, else it won't work and some unexpected behavior would occur
                await this.driver1.navigate().refresh()
                return {
                    message: `${numberOfTradeInjection} trades has been injected.`
                }
            }
            catch (exception) {
                console.log(`exception occured during the injection ${exception}. Trying again...`)   
            }
        }
    }
}