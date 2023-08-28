import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
