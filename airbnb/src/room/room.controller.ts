import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Headers, HttpStatus, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, FileUploadDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RoomDto } from './dto/room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/file-upload.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-room")
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @Req() req: Request,
    @Res() res: Response
  ) : Promise<Response<RoomDto>> {
    try {
      let user = req.user;
      let newRoom = await this.roomService.create(user,createRoomDto);
      return res.status(HttpStatus.CREATED).json(newRoom);
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "server error"});
    }
    
  }

  @Get("/get-rooms")
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "size", required: false, type: Number})
  @ApiQuery({name: "keyword", required: false, type: String})
  @ApiHeader({name: "token", required: false })
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Headers("token") token: string
  ) : Promise<Response<RoomDto>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;

      let rooms = await this.roomService.findAll(formatPage, formatSize, keyword);
      return res.status(HttpStatus.OK).json(rooms);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"error"})
    }
  }

  @Get('/get-room-by-id/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ) : Promise<Response<RoomDto>>{

    try {
      let room = await this.roomService.findOne(Number(id));
      return res.status(HttpStatus.OK).json(room);
      
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
  }

  @Get('/get-room-by-location/:locate_id')
  async findByLocate(
    @Param('locate_id') locate_id: string,
    @Res() res: Response
  ) : Promise<Response<RoomDto>>{

    try {
      let room = await this.roomService.findByLocate(Number(locate_id));
      return res.status(HttpStatus.OK).json(room);
      
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-room/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateRoomDto: UpdateRoomDto,
    @Req() req: Request,
    @Res() res: Response,
  ) :Promise<Response<RoomDto>> {
    try {
      let user = req.user;
      let updateRoom = await this.roomService.update(Number(id), updateRoomDto,user);
      return res.status(HttpStatus.OK).json(updateRoom);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Sever error"});
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-room/:id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) :Promise<Response<any>> {
    try {

      let user = req.user;
      await this.roomService.remove(Number(id),user);

      return res.status(HttpStatus.OK).json({message:"Delete successfully"})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Delete successfully"})
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-room-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    required: true
  })
  @UseInterceptors(FileInterceptor('image', {storage: getStorageOptions('videos')}))
  uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // console.log("req: ", req)
    return res.status(200).json({file})
  }
}
