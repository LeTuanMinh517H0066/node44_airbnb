import { Expose } from "class-transformer";


export class CommentDto {
    @Expose()
    room_id: number;

    @Expose()
    user_id: number;

    @Expose()
    comment: string;

    @Expose()
    date: string;

    constructor(partial: Partial<CommentDto>) {
        Object.assign(this, partial);
    }

}