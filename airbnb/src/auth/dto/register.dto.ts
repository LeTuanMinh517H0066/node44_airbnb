import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({message: "Email không được để trống"})
    @IsEmail({}, {message: "Email không đúng định dạng"})
    @ApiProperty()
    email: string;

    @IsNotEmpty({message: "Password không được để trống"})
    @ApiProperty()
    pass_word: string;

    @IsNotEmpty({message: "Số điện thoại không được để trống"})
    @ApiProperty()
    phone: string;

    @IsNotEmpty({message: "Số điện thoại không được để trống"})
    @ApiProperty()
    birth_day: string;

    @IsNotEmpty({message: "Vui lòng lựa chọn giới tính"})
    @ApiProperty()
    gender: number;

    @IsNotEmpty({message: "Vui lòng lựa chọn chức năng"})
    @ApiProperty()
    role: number;

    @IsNotEmpty({message: "Tên không được để trống"})
    @ApiProperty()
    name: string;

}