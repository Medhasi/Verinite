import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from '../entity/book';
import { BookData } from '../entity/book-data';
import { Registration } from '../entity/registration';

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  change(registration: Registration) {
    throw new Error('Method not implemented.');
  }
  baseUrl: string;
  getBooksList() {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  updateBook(book: BookData): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/book/updateBook/`+ book.bookId,book);
    }
  getBooks() {
    // return this.httpClient.get<Book[]>('http://localhost:8080/book/getAllBooks');
    return this.httpClient.get<Book[]>(`${this.baseUrl}/book/getAllBooks`);
  }

  addBook(newBook: Book) {
    return this.httpClient.post<Book>(`${this.baseUrl}/book/saveBooks`, newBook);
  }

  getBookById(bookId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/book/viewBook/` + bookId);

  }
  getBookByIddetails(bookId: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/book/viewBookbyId/` + bookId);

  }
  
  deleteBook(bookId: number): Observable<any>  {
    return this.httpClient.delete(`${this.baseUrl}/book/deleteBook/` + bookId);
  }
}
