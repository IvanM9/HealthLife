/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfesionalesModule } from './profesionales/profesionales.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [AuthModule, ProfesionalesModule, ClientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
