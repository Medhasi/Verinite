export class Bookstockdto {
  book_id!: number;
  stock_id!: number;
  book_title!: string;
  description!: string;
  book_price!: number;
  quantity!: number;
  pic_byte!: string;
  publisher_id!: number;
  retrieved_image!: string;
  bookQty: number = 1;
}
