import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Account } from "src/account/entities/account.entity";
import { AccountService } from "src/account/account.service";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CreateAccountDto } from "src/account/dto/create-account.dto";
import { promises } from "dns";

Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private AccountService: AccountService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
}

async validate(email: string,) {
    const user = await this.AccountService.getUser(email);
    if (!user) {
        throw new UnauthorizedException('log in first')
    }
    
    return user;
}

}