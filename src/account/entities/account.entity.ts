import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory, } from "@nestjs/mongoose";
import { PasswordResetToken } from "./password.entity";
import { OneToOne } from "typeorm";


export type AccountDocument = HydratedDocument <Account>;

@Schema()
export class Account {

    @Prop()
    password: string;

    @Prop()
    email: string;

    @OneToOne(() => PasswordResetToken, (token) => token.account)
  PasswordResetToken?: PasswordResetToken;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

