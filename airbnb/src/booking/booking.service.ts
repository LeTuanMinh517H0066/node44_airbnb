import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaClient } from '@prisma/client';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { plainToClass } from 'class-transformer';
import { BookingDto } from './dto/booking.dto';
import { throwError } from 'rxjs';

@Injectable()
export class BookingService {
  prisma = new PrismaClient();

  
  async create(
    user: any,
    createBookingDto: CreateBookingDto
  ): Promise<BookingDto> {
    try {
      let newBooking = await this.prisma.bookings.create({
        data: {
          room_id: createBookingDto.room_id,
          user_id: user.id,
          checkin: createBookingDto.checkin,
          checkout: createBookingDto.checkout,
          regis_num: createBookingDto.regis_num
        }
      });

      return plainToClass(BookingDto, newBooking);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, size: number): Promise<BookingDto[]> {
    try {
      let bookings = await this.prisma.bookings.findMany({
        skip: (page - 1) * size,
        take: size,
      });

      return bookings.map((booking) => plainToClass(BookingDto, booking));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<BookingDto> {
    try {
      let booking = await this.prisma.bookings.findFirst({
        where: {
          id: id,
        },
      });
      return plainToClass(BookingDto, booking);
    } catch (error) {
      throw new Error(error);
    }
    // return `This action returns a #${id} booking`;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto, user:any) : Promise<BookingDto> {
    // return `This action updates a #${id} booking`;
    try {
      let updateBooking = await this.prisma.bookings.findFirst({
        where: {
          id: id,
          user_id: user.id
        },
      });
      if(!updateBooking) {
        throw new Error('Booking not found');
      }

      let updatedBooking = await this.prisma.bookings.update({
        where: {
          id: id,
        },
        data: updateBookingDto
      })
      return plainToClass(BookingDto, updatedBooking)
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number,user:any) : Promise<number> {
    // return `This action removes a #${id} booking`;
    try {
      let checkBooking = await this.prisma.bookings.findFirst({
        where: {
          id: id,
          user_id: user.id
          },
      })
      if(!checkBooking) {
        throw new Error('Booking not found');
      
      }
      await this.prisma.bookings.delete({
        where: {
          id: id,
          },
      })
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUser(user_id: number) : Promise<BookingDto[]> {
    try {
      let bookingByUser = await this.prisma.bookings.findMany({
        where: {
          user_id: user_id,
        },
      });
      if (!bookingByUser) {
        throw new Error('Booking by user not found');
      }

      return bookingByUser.map((booking) => plainToClass(BookingDto, booking));

    } catch (error) {
      throw new Error(error);
    }
  }
}
