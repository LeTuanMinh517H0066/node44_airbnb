import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty } from "class-validator";


export class UpdateCommentDto {
    // @ApiProperty() // show property ra giao diện swagger
    // room_id: number;

    // @ApiProperty() // show property ra giao diện swagger
    // user_id: number;

    @IsNotEmpty({message: "Comment không được để trống"})
    @ApiProperty() // show property ra giao diện swagger
    comment: string;

    // @IsDateString()
    // @ApiProperty() // show property ra giao diện swagger
    // date: string;
    
}