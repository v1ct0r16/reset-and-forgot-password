import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Account } from "src/account/entities/account.entity";
import { AccountService } from "src/account/account.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private AccountService: AccountService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
}

async validate(LoginDto: { email }):Promise<string> {
    const {email} = LoginDto;
    const user = await this.AccountService.findOne(email);
    if (!user) {
        throw new UnauthorizedException('log in first')
    }
    
    return user;
}

}