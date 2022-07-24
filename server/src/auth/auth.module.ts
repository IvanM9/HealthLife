/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConexionService } from 'src/conexion/conexion.service';
import { JwtStrategy } from './session/jwt.strategy';
import { SessionController } from './session/session.controller';
import { SessionService } from './session/session.service';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.SECRETKEY,
          signOptions: { expiresIn: '4h' },
        }),
      ],
      controllers: [SessionController],
      providers: [ConexionService, SessionService, JwtStrategy],
    
})
export class AuthModule {}
