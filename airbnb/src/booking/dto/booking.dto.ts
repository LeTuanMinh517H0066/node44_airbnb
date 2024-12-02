import { Expose } from "class-transformer";


export class BookingDto {
    @Expose()
    room_id: number;

    @Expose()
    user_id: number;

    @Expose()
    checkin: string;

    @Expose()
    checkout: string;

    @Expose()
    regis_num: string;

    constructor(partial: Partial<BookingDto>) {
        Object.assign(this, partial);
    }

}