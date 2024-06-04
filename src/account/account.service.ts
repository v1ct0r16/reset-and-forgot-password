import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { error } from 'console';
import { Request, Response, } from 'express';
import { AccountModule } from './account.module';

@Injectable()
export class AccountService {
  // create(createAccountDto: CreateAccountDto) {
  //   return 'This action adds a new account';
  // }

  findAll() {
    return `This action returns all account`;
  }

  constructor(@InjectModel(Account) private accountModel:Model<Account>, private readonly jwtService){}
   async signUp(createAccountDto: CreateAccountDto) {
    createAccountDto.email = createAccountDto.email.toLowerCase();
    const {email, password, ...rest}= createAccountDto;
    const user = await this.accountModel.findOne({where:{email}})
    if (user) throw new HttpException('sorry user with this email already exists', 400)
      
      const hashPassword = await bcrypt.hash(password, 10)

      try{
     const user = await this.accountModel.create({email, password:hashPassword, ...rest})
     delete user.password
     return user;
      } 
      
      catch (error) {
        if (error.code = '22p02') {
          throw new BadRequestException ('admin role should be lowercase')
        }
        return error
      }

    // return 'This action adds a new account';
    }



  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
