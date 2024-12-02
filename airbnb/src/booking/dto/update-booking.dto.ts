import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookingDto  {

    @IsNotEmpty({message: "Ngày checkin không được để trống"})
    @ApiProperty() // show property ra giao diện swagger
    checkin: Date;

    @IsNotEmpty({message: "Ngày checkout không được để trống"})
    @ApiProperty() // show property ra giao diện swagger
    checkout: Date;

    @IsNotEmpty({message: "Số lượng không được để trống"})
    @ApiProperty() // show property ra giao diện swagger
    regis_num: number;
}
