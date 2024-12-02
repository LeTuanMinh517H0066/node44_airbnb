import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomDto {
    @IsNotEmpty({message:"Tên phòng không được để trống"})
    @ApiProperty()
    room_name: string;

    @IsNotEmpty({message:"Số lượng khách không được để trống"})
    @ApiProperty()
    guests: number;


    @IsNotEmpty({message:"Số lượng phòng ngủ không được để trống"})
    @ApiProperty()
    bed_rooms: number;


    @IsNotEmpty({message:"Số lượng giường ngủ không được để trống"})
    @ApiProperty()
    beds: number;


    @IsNotEmpty({message:"Số lượng phòng tắm không được để trống"})
    @ApiProperty()
    bath_rooms: number;


    @IsNotEmpty({message:"Mô tả không được để trống"})
    @ApiProperty()
    description: string;

    @IsNotEmpty({message:"Giá thuê không được để trống"})
    @ApiProperty()
    price: number;

    
    @ApiProperty()
    washing: boolean;

    
    @ApiProperty()
    iron: boolean;

    
    @ApiProperty()
    tivi: boolean;

    @ApiProperty()
    wifi: boolean;

    
    @ApiProperty()
    kitchen: boolean;

    
    @ApiProperty()
    parking: boolean;

    
    @ApiProperty()
    pool: boolean;

    @IsNotEmpty({message:"Hình không được để trống"})
    @ApiProperty()
    image: string;

    // @ApiProperty()
    // user_id: number;

    @ApiProperty()
    locate_id: number;
}
