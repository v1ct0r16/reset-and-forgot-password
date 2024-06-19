import { Prop, Schema,} from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid'; // Or any other secure token generation method
import { Account } from './account.entity';
import { ManyToOne } from 'typeorm';

@Schema()
export class PasswordResetToken {
  @Prop()
  id: number;

  @Prop({ unique: true })
  token: string = uuidv4(); 

  @Prop()
  expiresAt: Date;

  @ManyToOne(() => Account, (account) => account.PasswordResetToken)
  account: Account;
} 