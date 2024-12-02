import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentDto } from './dto/comment.dto';
import { plainToClass } from 'class-transformer';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async findAll(
    page: number,
    size: number,
    keyword: string,
  ): Promise<CommentDto[]> {
    try {
      let comments = await this.prisma.comments.findMany({
        where: keyword
          ? {
              comment: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });

      return comments.map((comment) => plainToClass(CommentDto, comment));
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(
    user: any,
    createCommentDto: CreateCommentDto): Promise<any> {
    try {
      let newComment = await this.prisma.comments.create({
        data: {
          comment: createCommentDto.comment,
          date: createCommentDto.date,
          room_id: createCommentDto.room_id,
          user_id: user.id,
        },
      });

      return plainToClass(CommentDto, newComment);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, user: any): Promise<CommentDto> {
    // return ;
    try {
      let updateComment = await this.prisma.comments.findFirst({
        where: {
          id: id,
          user_id: user.id,
        },
      });
      if (!updateComment) {
        throw new Error('Comment not found');
      }

      let updatedComment = await this.prisma.comments.update({
        where: {
          id: id,
        },
        data: updateCommentDto,
      });
      return plainToClass(CommentDto, updatedComment);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async remove(
    id: number,
    user: any
  ): Promise<number> {
    // return `This action removes a #${id} video`;
    try {
      let checkComment = await this.prisma.comments.findFirst({
        where: {
          id: id,
          user_id: user.id,
        },
      });
      if (!checkComment) {
        throw new Error('Comment not found');
      }
      await this.prisma.comments.delete({
        where: {
          id: id,
        },
      });
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByRoom(room_id: number) : Promise<CommentDto[]> {
    try {
      let commentByRoom = await this.prisma.comments.findMany({
        where: {
          room_id: room_id,
        },
      });
      if (!commentByRoom) {
        throw new Error('Comment by room not found');
      }

    //   return plainToClass(CommentDto, commentByRoom);
      return commentByRoom.map((comment) => plainToClass(CommentDto, comment));

    } catch (error) {
      throw new Error(error);
    }
  }
}
