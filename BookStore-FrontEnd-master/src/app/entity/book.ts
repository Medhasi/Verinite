export class Book {
  bookId!: number;
  bookTitle!: string;
  description!: String;
  bookPrice!: number;
  createdOn!: Date;
  updatedOn!: Date;
  publisherId!: number;
  isDeleted!: boolean;
  bookQty: number = 1;
  picByte!: string;
  retrievedImage!: any;
  totalPrice!: number;
  quantity!: number;
  authorId!:number;
  categoryId!: number;
}
