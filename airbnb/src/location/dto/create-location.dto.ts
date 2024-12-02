import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateLocationDto {
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

export class FileUploadDto {
    @ApiProperty({type: 'string', format: 'binary'})
    image: any;
}

export class FilesUploadDto {
    @ApiProperty({type: 'array', items: { type: 'string', format: 'binary'}})
    image: any[];
}