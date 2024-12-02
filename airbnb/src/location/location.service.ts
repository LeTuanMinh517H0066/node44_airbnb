import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocationService {
  prisma = new PrismaClient();

  async create(createLocationDto: CreateLocationDto): Promise<LocationDto> {
    try {
      let newLocation = await this.prisma.locations.create({
        data: createLocationDto,
      });
      return plainToClass(LocationDto, newLocation);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(
    page: number,
    size: number,
    keyword: string,
  ): Promise<LocationDto[]> {
    try {
      let locations = await this.prisma.locations.findMany({
        where: keyword
          ? {
              locate_name: {
                contains: keyword,
              },
            }
          : {},
        skip: (page - 1) * size,
        take: size,
      });

      return locations.map((location) => plainToClass(LocationDto, location));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<LocationDto> {
    try {
      let location = await this.prisma.locations.findFirst({
        where: {
          id: id,
        },
      });
      return plainToClass(LocationDto, location);
    } catch (error) {
      throw new Error(error);
    }
    // return `This action returns a #${id} location`;
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<LocationDto> {
    try {
      let updateLocation = await this.prisma.locations.findFirst({
        where: {
          id: id,
        },
        
      });

      if(!updateLocation) {
        throw new Error('Location not found');
      }
      let updatedLocation = await this.prisma.locations.update({
        where: {
          id: id,
        },
        data: updateLocationDto
      })

      return plainToClass(LocationDto, updatedLocation)
    } catch (error) {
      throw new Error(error);
    }
    // return `This action updates a #${id} location`;
  }

  async remove(id: number) : Promise<number> {
    try {
      let checkLocation = await this.prisma.locations.findFirst({
        where: {
          id: id,
          },
      })
      if(!checkLocation) {
        throw new Error('Location not found');
      
      }
      await this.prisma.locations.delete({
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
