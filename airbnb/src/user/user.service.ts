import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto) : Promise<UserDto> {
    try {
      const checkUser = await this.prisma.users.findFirst({
        where: { email: createUserDto.email },
      });
      if (checkUser) {
        throw new BadRequestException('Email already exists');
      }
      const newUser = await this.prisma.users.create({
        data: {
          email: createUserDto.email,
          pass_word: bcrypt.hashSync(createUserDto.pass_word, 10),
          phone: createUserDto.phone,
          birth_day: createUserDto.birth_day,
          role: createUserDto.role,
          gender: createUserDto.gender,
          name: createUserDto.name,
        },
      });
      return plainToClass(UserDto, newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    page: number,
    size: number,
    keyword: string
  ) : Promise<UserDto[]> {
    try {
      let users = await this.prisma.users.findMany({
        where: keyword
          ? {
              name: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });
      return users.map((user) => plainToClass(UserDto, user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) : Promise<UserDto> {
    try {
      let user = await this.prisma.users.findFirst({
        where: {
          id: id,
        },
      });
      return plainToClass(UserDto, user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, user: any) : Promise<UserDto> {
    try {
      let updateUser = await this.prisma.users.findFirst({
        where: {
          id: id,

        },
        
      });

      if(!updateUser) {
        throw new Error('User not found');
      }
      let updatedRoom = await this.prisma.users.update({
        where: {
          id: id,
        },
        data: updateUserDto
      })

      return plainToClass(UserDto, updatedRoom)
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) : Promise<number> {
    try {
      let checkUser = await this.prisma.users.findFirst({
        where: {
          id: id,
          },
      })
      if(!checkUser) {
        throw new Error('User not found');
      
      }
      await this.prisma.users.delete({
        where: {
          id: id,
          },
      })
      return 1;
    } catch (error) {
      throw new Error(error)
    }
  }
}
