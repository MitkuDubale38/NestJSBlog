import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [PostsModule,MongooseModule.forRoot('mongodb+srv://mite:Qwerty123@cluster0.fnsxr3u.mongodb.net/blog')],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
