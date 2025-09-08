import { CmeService } from './cme.service';
import { Controller, Get } from '@nestjs/common';

@Controller('cme')
export class CmeController {
    constructor(private cmeService: CmeService) {}

    @Get('/api/cme')
    getContent(): string {
        return this.cmeService.getContent();
    }
}
