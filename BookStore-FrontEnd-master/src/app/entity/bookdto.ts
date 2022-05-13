export class Bookdto {
    book_id!: number;
    book_title!: string;
    description!: String;
    book_price!: number;
    created_on!: Date;
    updated_on!: Date;
    publisher_name!: string;
    isDeleted!: boolean;
    book_qty: number = 1;
    pic_byte!: string;
    retrieved_image!: any;
    totalPrice!: number;
    quantity!: number;
    first_name!:string;
    last_name!:string;
    category_title!: string;
}
