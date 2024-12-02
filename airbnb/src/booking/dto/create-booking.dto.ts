import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class CreateBookingDto {

    // @ApiProperty()
    user_id: number;

    @ApiProperty()
    room_id: number;

    @IsDateString()
    @ApiProperty()
    checkin: Date;

    @IsDateString()
    @ApiProperty()
    checkout: Date;

    @ApiProperty()
    regis_num: number;

}
