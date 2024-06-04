import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type AccountDocument = HydratedDocument <Account>;

@Schema()
export class Account {

    @Prop()
    password: string;

    @Prop()
    email: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);