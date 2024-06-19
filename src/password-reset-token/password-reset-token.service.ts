import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/account/entities/account.entity';
import { PasswordResetToken } from 'src/account/entities/password.entity';


@Injectable()
export class PasswordResetTokenService {
    constructor( @InjectModel(Account.name) private readonly userModel: Model<Account>, private readonly emailService: AccountService) {}

 
    async sendForgotPasswordEmail(email: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
          return; // Handle user not found scenario (optional)
        }
    
        const token = await this.createPasswordResetToken(user);
        const resetLink = `http://localhost:3000/account/login${token.token}`;
        await this.emailService.sendForgotPasswordEmail(user.email, resetLink);
      }
    
      private async createPasswordResetToken(user: Account): Promise<PasswordResetToken> {
        const token = new PasswordResetToken();[]
        token.account = user;
        token.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiration
        return (token);
      }
    }

