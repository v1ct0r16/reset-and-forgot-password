import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PasswordResetTokenService } from './password-reset-token/password-reset-token.service';
import { ForgotPasswordService } from './forgot-password/forgot-password.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),MongooseModule.forRoot(process.env.DB_URL),AccountModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (ConfigService: ConfigService) => ({
      secret: ConfigService.getOrThrow('JWT_SECRET'),
      signOptions: {
        // algorithm: ConfigService.getOrThrow('JWT ALGORITHM'),
        expiresIn: ConfigService.getOrThrow('JWT_EXPIRESIN')
      }
    })
    , inject: [ConfigService]
  }),],
  controllers: [AppController],
  providers: [AppService, PasswordResetTokenService, ForgotPasswordService],
  
})
export class AppModule {}
