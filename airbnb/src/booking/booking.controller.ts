import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query, Res, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { BookingDto } from './dto/booking.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Booking')

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create-bookings')
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request,
    @Res() res: Response,
    
  ) : Promise<Response<BookingDto>> {

    try {
      let user = req.user;
      let newBooking = await this.bookingService.create(user,createBookingDto);
      return res.status(HttpStatus.CREATED).json(newBooking);
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }

    
  }

  @Get('/get-bookings')
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "size", required: false, type: Number})
  @ApiResponse({status: HttpStatus.OK, description: "Get list comments successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Res() res: Response,
  ): Promise<Response<BookingDto[]>> {
    // return this.bookingService.findAll();
    try {

      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;

      let bookings = await this.bookingService.findAll(formatPage, formatSize);
      return res.status(HttpStatus.OK).json(bookings);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Server error"})
    }
  }

  @Get('/get-booking-by-id/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response<BookingDto>> {
    try {
      let booking = await this.bookingService.findOne(Number(id));
      return res.status(HttpStatus.OK).json(booking);
      
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "server error"});
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-booking/:id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req: Request,
    @Res() res: Response,
  ) : Promise<Response<BookingDto>> {
    try {
      let user = req.user;
      let updateBooking = await this.bookingService.update(Number(id),updateBookingDto,user);
      return res.status(HttpStatus.OK).json(updateBooking);
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
    
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-booking/:id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<string>>  {
    try {
      let user = req.user;
      await this.bookingService.remove(Number(id),user);

      return res.status(HttpStatus.OK).json({message:"Delete successfully"})
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
      
  }

  @Get('/get-booking-by-user/:user_id')
  async findCmtByRoom(
    @Param('user_id') user_id: string,
    @Res() res: Response,
  ) : Promise<Response<BookingDto>> {
    let booking = await this.bookingService.findByUser(Number(user_id));
    return res.status(HttpStatus.OK).json(booking);
  }
}
