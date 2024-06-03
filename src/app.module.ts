import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),MongooseModule.forRoot(process.env.DB_URL),AccountModule],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
