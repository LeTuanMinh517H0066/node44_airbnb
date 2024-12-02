import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    pass_word: string

    @Expose()
    phone: string

    @Expose()
    birth_day: string

    @Expose()
    gender: number

    @Expose()
    role: number

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}