import { Expose } from "class-transformer";

export class RoomDto {
    @Expose()
    room_name: string;

    @Expose()
    guests: number;


    @Expose()
    bed_rooms: number;


    @Expose()
    beds: number;


    @Expose()
    bath_rooms: number;


    @Expose()
    description: string;

    @Expose()
    price: number;

    
    @Expose()
    washing: boolean;

    
    @Expose()
    iron: boolean;

    
    @Expose()
    tivi: boolean;
    
    @Expose()
    wifi: boolean;

    
    @Expose()
    kitchen: boolean;

    
    @Expose()
    parking: boolean;

    
    @Expose()
    pool: boolean;

    @Expose()
    image: string;

    @Expose()
    user_id: number;

    @Expose()
    locate_id: number;

    constructor(partial: Partial<RoomDto>) {
        Object.assign(this, partial);
    }
}