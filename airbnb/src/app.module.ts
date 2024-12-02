import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { CommentModule } from './comment/comment.module';
import { BookingModule } from './booking/booking.module';
import { LocationModule } from './location/location.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    EmailModule,
    CommentModule,
    BookingModule,
    LocationModule,
    RoomModule,
    UserModule, // load tất cả biến môi trường và sử dụng ở mọi nơi
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
