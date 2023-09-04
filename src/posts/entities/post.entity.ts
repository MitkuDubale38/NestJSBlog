import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { Types } from 'mongoose';
import { IPost } from '../interfaces/post.interface';

@Schema()
export class Post implements IPost {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
