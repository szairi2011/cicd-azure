import { Controller, Get, Post } from '@nestjs/common';
import { AppService, Book } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/books')
  addBook(id:number, title:string): Book {
    return this.appService.addBook(id, title);
  }
}
