import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PasswordResetToken } from "./password.entity";


export type AccountDocument = HydratedDocument <Account>;

@Schema()
export class Account {

    @Prop()
    password: string;

    @Prop()
    email: string;

    @OneToOne(() => PasswordResetToken, (token) => token.user)
  PasswordResetToken?: PasswordResetToken;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

