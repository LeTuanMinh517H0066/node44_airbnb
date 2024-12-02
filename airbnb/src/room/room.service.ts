import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomDto } from './dto/room.dto';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoomService {
  prisma = new PrismaClient();

  async create(
    user: any,
    createRoomDto: CreateRoomDto
  ) : Promise<RoomDto> {
    try {
      let newRoom = await this.prisma.rooms.create({
        data: {
          room_name: createRoomDto.room_name,
          guests: createRoomDto.guests,
          bed_rooms: createRoomDto.bed_rooms,
          beds: createRoomDto.beds,
          bath_rooms: createRoomDto.bath_rooms,
          description: createRoomDto.description,
          price: createRoomDto.price,
          washing: createRoomDto.washing,
          iron: createRoomDto.iron,
          tivi: createRoomDto.tivi,
          wifi: createRoomDto.wifi,
          kitchen: createRoomDto.kitchen,
          parking: createRoomDto.parking,
          pool: createRoomDto.pool,
          image: createRoomDto.image,
          user_id: user.id,
          locate_id: createRoomDto.locate_id
        }
      })      
      return plainToClass(RoomDto, newRoom);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    page: number,
    size: number,
    keyword: string

  ) : Promise<RoomDto[]> {
    try {
      let rooms = await this.prisma.rooms.findMany({
        where: keyword
          ? {
              room_name: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });
      return rooms.map((room) => plainToClass(RoomDto, room));
    } catch (error) {
      throw new Error(error);
    }
    // return `This action returns all room`;
  }

  async findOne(id: number) : Promise<RoomDto> {
    try {
      let room = await this.prisma.rooms.findFirst({
        where: {
          id: id,
        },
      });
      return plainToClass(RoomDto, room);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByLocate(locate_id: number) : Promise<RoomDto> {
    try {
      let room = await this.prisma.rooms.findFirst({
        where: {
          locate_id: locate_id,
        },
      });
      return plainToClass(RoomDto, room);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto, user: any): Promise<RoomDto> {
    try {
      let updateRoom = await this.prisma.rooms.findFirst({
        where: {
          id: id,
          user_id: user.id
        },
        
      });

      if(!updateRoom) {
        throw new Error('Room not found');
      }
      let updatedRoom = await this.prisma.rooms.update({
        where: {
          id: id,
        },
        data: updateRoomDto
      })

      return plainToClass(RoomDto, updatedRoom)
    } catch (error) {
      throw new Error(error);
    }
    // return `This action updates a #${id} location`;
  }

  async remove(id: number, user: any) : Promise<number> {
    try {
      let checkRoom = await this.prisma.rooms.findFirst({
        where: {
          id: id,
          user_id: user.id
          },
      })
      if(!checkRoom) {
        throw new Error('Room not found');
      
      }
      await this.prisma.rooms.delete({
        where: {
          id: id,
          },
      })
      return 1;
    } catch (error) {
      throw new Error(error)
    }
    // return `This action removes a #${id} location`;
  }
}
