import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateLocationDto {
    
    @IsNotEmpty({message:"Tên địa chỉ không được để trống"})
    @ApiProperty()
    locate_name: string;

    @IsNotEmpty({message:"Tên thành phố không được để trống"})
    @ApiProperty()
    city: string

    @IsNotEmpty({message:"Tên nước không được để trống"})
    @ApiProperty()
    country: string

    @IsNotEmpty({message: "Hình ảnh không được để trống"})
    @ApiProperty()
    image: string
}
