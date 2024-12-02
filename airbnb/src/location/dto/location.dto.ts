import { Expose } from "class-transformer";


export class LocationDto {
    @Expose()
    locate_name: string

    @Expose()
    city: string

    @Expose()
    country: string

    @Expose()
    image: string

    constructor(partial: Partial<LocationDto>) {
        Object.assign(this, partial);
    }
}