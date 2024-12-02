import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res, Headers, HttpStatus, UseInterceptors, UploadedFile, Req, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto, FileUploadDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LocationDto } from './dto/location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { getStorageOptions } from 'src/shared/file-upload.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-location")
  async create(
    @Body() createLocationDto: CreateLocationDto,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<LocationDto>> {
    try {

      let user = req.user;
      // console.log(user['role'])
      if(user['role'] != 3) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not authorized to performthis action" });
      }
      
      let newLocation = await this.locationService.create(createLocationDto);
      return res.status(HttpStatus.CREATED).json(newLocation);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "server error"});
    }
  }

  @Get("/get-locations")
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
  ) : Promise<Response<LocationDto>>{
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;

      let locations = await this.locationService.findAll(formatPage, formatSize, keyword);
      return res.status(HttpStatus.OK).json(locations);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"error"})
    }
  }

  @Get('/get-location-by-id/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ) : Promise<Response<LocationDto>> {
    try {
      let location = await this.locationService.findOne(Number(id));

      return res.status(HttpStatus.OK).json(location)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-location/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateLocationDto: UpdateLocationDto,
    @Req() req: Request,
    @Res() res: Response,
  ) :Promise<Response<LocationDto>> {
    try {
      let user = req.user;
      // console.log(user['role'])
      if(user['role'] != 3) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not authorized to performthis action" });
      }
      let updateLocation = await this.locationService.update(Number(id), updateLocationDto);
      return res.status(HttpStatus.OK).json(updateLocation);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Sever error"});
    }
    // return this.locationService.update(+id, updateLocationDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-location/:id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) :Promise<Response<any>> {
    try {
      let user = req.user;
      // console.log(user['role'])
      if(user['role'] != 3) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: "You are not authorized to performthis action" });
      }
      await this.locationService.remove(Number(id));

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
  @UseInterceptors(FileInterceptor('image', {storage: getStorageOptions('locations')}))
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
