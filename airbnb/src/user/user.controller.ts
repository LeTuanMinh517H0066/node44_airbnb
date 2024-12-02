import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Headers, HttpStatus, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FileUploadDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/file-upload.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-user")
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response
  ) : Promise<Response<UserDto>> {
    try {

      let user = req.user;
      // console.log(user['role'])
      if(user['role'] != 3) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not authorized to performthis action" });
      }

      let newUser = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "server error"});
    }
  }

  @Get("/get-users")
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
  ) : Promise<Response<UserDto>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;

      let users = await this.userService.findAll(formatPage, formatSize, keyword);
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"error"})
    }
  }

  @Get('/get-user-by-id/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ) : Promise<Response<UserDto>> {
    try {
      let user = await this.userService.findOne(Number(id));
      return res.status(HttpStatus.OK).json(user);
      
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-user/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) :Promise<Response<UserDto>> {
    try {
      let user = req.user;
      let updateUser = await this.userService.update(Number(id), updateUserDto, user);
      return res.status(HttpStatus.OK).json(updateUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Sever error"});
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-room/:id')
  async remove(@Param('id') id: string,@Res() res: Response,) :Promise<Response<any>> {
    try {
      await this.userService.remove(Number(id));

      return res.status(HttpStatus.OK).json({message:"Delete successfully"})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Delete successfully"})
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-location-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
    required: true
  })
  @UseInterceptors(FileInterceptor('image', {storage: getStorageOptions('users')}))
  uploadThumbnail(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response
  ) {
    // console.log("req: ", req)
    let user = req.user;
    // console.log(user['role'])
    if(user['role'] != 3) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not authorized to performthis action" });
    }
    return res.status(200).json({file})
  }
}
