import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentDto } from './dto/comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("/get-comments")
  @ApiQuery({name: "page", required: false, type: Number})
  @ApiQuery({name: "size", required: false, type: Number})
  @ApiQuery({name: "keyword", required: false, type: String})
  @ApiHeader({name: "token", required: false })
  @ApiResponse({status: HttpStatus.OK, description: "Get list comments successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  async findAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Headers("token") token: string
  ) {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;

      let comments = await this.commentService.findAll(formatPage, formatSize, keyword);
      return res.status(HttpStatus.OK).json(comments);
    } catch (error) {
      return error
    }
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/create-comment")
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) : Promise<Response<CommentDto>> {
    try {
      let user = req.user;
      let newComment = await this.commentService.create(user,createCommentDto);
      return res.status(HttpStatus.CREATED).json(newComment);
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
    
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update-comment/:id')
  async update(
    @Param('id') id: string, 
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request,
    @Res() res: Response,
  ) : Promise<Response<CommentDto>> {
    // return this.videoService.update(+id, updateVideoDto);
    try {
      let user = req.user;
      let updateComment = await this.commentService.update(Number(id),updateCommentDto, user);
      return res.status(HttpStatus.OK).json(updateComment);
    } catch (error) {
      console.log(error)
      return res.status((HttpStatus.INTERNAL_SERVER_ERROR)).json({messeage: "Sever error"});
    }
    
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete-comment/:id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) : Promise<Response<string>>{
    // let user = req.user;
    try {
      let user = req.user;
      await this.commentService.remove(Number(id),user);

      return res.status(HttpStatus.OK).json({message:"Delete successfully"})
    } catch (error) {
      console.log(error)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"})
    }
    
  }

  @Get('/get-comment-by-room/:room_id')
  async findCmtByRoom(
    @Param('room_id') room_id: string,
    @Res() res: Response,
  ) : Promise<Response<CommentDto>> {
    let comment = await this.commentService.findByRoom(Number(room_id));
    return res.status(HttpStatus.OK).json(comment);
  }
}
