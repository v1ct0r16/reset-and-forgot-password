import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';

import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Jwtstrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  PassportModule.register({
    defaultStrategy: 'jwt',
    session: true,
  })

],
  controllers: [AccountController],
  providers: [AccountService, Jwtstrategy, JwtService],
  exports: [JwtService]  
  
})
export class AccountModule {}
