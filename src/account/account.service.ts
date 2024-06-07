import { BadRequestException, HttpException, Injectable, Req, Res } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './entities/account.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
// import { error } from 'console';
import { Request, Response, } from 'express';
// import { AccountModule } from './account.module';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel:Model<Account>, private readonly jwtService: JwtService,
  ){}
  // create(createAccountDto: CreateAccountDto) {
  //   return 'This action adds a new account';
  // }

  findAll() {
    return `This action returns all account`;
  }

  
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

    async login(LoginDto:CreateAccountDto, @Req() req:Request, @Res() res:Response){
      const {email, password} = LoginDto;
      const user = await this.accountModel.findOne({email})
      console.log(user);
      
      if (!user) throw new HttpException('user not found', 404);
      const isMatch = await bcrypt.compare(password, user.password)
      console.log(isMatch);
      
      if(!isMatch){
        throw new HttpException('user not found', 404);
      }

      const token = await this.jwtService.signAsync({_id:user._id, email:user.email});
      res.cookie('userAuthenticated', token, {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      })
      console.log(token);
      

    


    }

    async getUser(email: string) {
      return await this.accountModel.findOne({email})
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
