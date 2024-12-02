import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message:"Tên không được để trống"})
    @ApiProperty()
    name: string;

    @IsNotEmpty({message:"Email không được để trống"})
    @IsEmail()
    @ApiProperty()
    email: string

    @IsNotEmpty({message:"Mật khẩu không được để trống"})
    @ApiProperty()
    pass_word: string;

    @IsNotEmpty({message:"Số điện thoại không được để trống"})
    @ApiProperty()
    phone: string

    @IsNotEmpty({message: "Ngày sinh không được để trống"})
    @ApiProperty()
    birth_day: string

    @IsNotEmpty({message: "Giới tính không được để trống"})
    @ApiProperty()
    gender: number

    @IsNotEmpty({message: "Role không được để trống"})
    @ApiProperty()
    role: number
}

export class FileUploadDto {
    @ApiProperty({type: 'string', format: 'binary'})
    image: any;
}

export class FilesUploadDto {
    @ApiProperty({type: 'array', items: { type: 'string', format: 'binary'}})
    image: any[];
}