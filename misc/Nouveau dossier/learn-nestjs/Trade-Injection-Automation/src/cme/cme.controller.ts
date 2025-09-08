import { Body } from '@nestjs/common';
import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CmeService } from './cme.service';


@Controller('cme')
export class CmeController {

    constructor(private cmeService: CmeService)  {

    }

    @Post("loginPhase1") 
    async loginPhase1(): Promise<Object> {
        return await this.cmeService.loginPhase1();
        
    }

    @Post("loginPhase2") 
    async loginPhase2(@Body('passcode', ParseIntPipe) passcode: number): Promise<Object> {
        console.log("loginPhase2 endpoint has been invoked ...")
        return this.cmeService.loginPhase2(passcode)
    }

    @Post("tradeInjection")
    async tradeInjection(@Body('numberOfTrade', ParseIntPipe) numberOfTrade: number): Promise<Object> {

        return this.cmeService.tradeEntry(numberOfTrade)
        }
    }