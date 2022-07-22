/* eslint-disable prettier/prettier */
import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/api')
  getHello() {
    return {url: 'http://localhost:3000/api'};
  }
}
