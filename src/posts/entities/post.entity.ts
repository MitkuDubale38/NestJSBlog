import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Document, Types } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
