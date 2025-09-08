import { Post } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  addBook(id:number, title:string): Book {
    return {
      id: id,
      title: title
    };
  }

  
}

export interface Book {
  id: number;
  title: string;
}
