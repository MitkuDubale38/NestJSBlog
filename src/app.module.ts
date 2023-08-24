import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [PostsModule,MongooseModule.forRoot('mongodb+srv://mite:Qwerty123@cluster0.fnsxr3u.mongodb.net/blog')],
})
export class AppModule {}
